export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
}

export const defaultTheme: Theme = {
  background: '#1a2335',
  text: '#eeeeee',
  primary: '#28a29c',
  secondary: '#ed8936',
};

export type Colors =
  | 'primary'
  | 'secondary'
  | 'black'
  | 'white'
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink';
