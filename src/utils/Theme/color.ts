export function lighten(color: string, amount: number = 10) {
  const amountColor = new Color(
    (256 * amount) / 100,
    (256 * amount) / 100,
    (256 * amount) / 100
  );
  return Color.convertFrom(color)?.add(amountColor).hashColor;
}

export function darken(color: string, amount: number = 10) {
  const amountColor = new Color(
    -(256 * amount) / 100,
    -(256 * amount) / 100,
    -(256 * amount) / 100
  );
  return Color.convertFrom(color)?.add(amountColor).hashColor;
}

export function opposite(colorStr: string) {
  const color = Color.convertFrom(colorStr);
  if (!color) {
    return undefined;
  }

  const { red, blue, green, opacity } = color;

  return new Color(255 - red, 255 - blue, 255 - green, opacity).hashColor;
}

export function isDark(colorStr: string) {
  const color = Color.convertFrom(colorStr);
  if (!color) {
    return false;
  }

  const { red, blue, green } = color;
  return (red + blue + green) / 3 < 127;
}

export class Color {
  red: number;
  green: number;
  blue: number;
  opacity: number;

  constructor(red: number, green: number, blue: number, opacity: number = 1.0) {
    // わざと-の部分は消している
    if (red > 255) {
      this.red = 255;
    } else {
      this.red = red;
    }
    if (green > 255) {
      this.green = 255;
    } else {
      this.green = green;
    }
    if (blue > 255) {
      this.blue = 255;
    } else {
      this.blue = blue;
    }
    if (opacity > 1.0) {
      this.opacity = 1.0;
    } else {
      this.opacity = opacity;
    }
  }

  static convertFrom(hashColor: string): Color | undefined {
    const colorRegexp = /#(?<red>[\da-f]{2})(?<green>[\da-f]{2})(?<blue>[\da-f]{2})(?<opacity>[\da-f]{2})?/;
    const m = hashColor.match(colorRegexp);
    if (m?.groups) {
      return new Color(
        parseInt(m.groups['red'], 16),
        parseInt(m.groups['green'], 16),
        parseInt(m.groups['blue'], 16),
        parseInt(m.groups['opacity'] || 'ff', 16) / 256
      );
    }
    return undefined;
  }

  add(color: Color) {
    this.red += color.red;
    this.green += color.green;
    this.blue += color.blue;
    if (this.opacity && color.opacity) {
      this.opacity += color.opacity;
    }
    return this.format();
  }

  get hashColor() {
    const formated = this.format();
    const color = `#${Math.round(formated.red)
      .toString(16)
      .padStart(2, '0')}${Math.round(formated.green)
      .toString(16)
      .padStart(2, '0')}${Math.round(formated.blue)
      .toString(16)
      .padStart(2, '0')}`;
    if (formated.opacity === 1.0) {
      return color;
    } else {
      return color + Math.round(formated.opacity * 256).toString(16);
    }
  }

  format(): Color {
    const color = Object.assign({}, this);
    if (color.red > 255) {
      color.red = 255;
    }
    if (color.red < 0) {
      color.red = 0;
    }
    if (color.green > 255) {
      color.green = 255;
    }
    if (color.green < 0) {
      color.green = 0;
    }
    if (color.blue > 255) {
      color.blue = 255;
    }
    if (color.blue < 0) {
      color.blue = 0;
    }
    if (color.opacity > 1.0) {
      color.opacity = 1.0;
    }
    if (color.opacity < 0) {
      color.opacity = 0;
    }
    return new Color(color.red, color.green, color.blue, color.opacity);
  }
}
