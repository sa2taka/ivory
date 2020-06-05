import React from 'react';
import 'public/ivory-logo.png';
import './GettingStarted.scss';
import { Button } from '@/components/atoms/Button';

interface Props {}

export const GettingStarted: React.FC<Props> = () => {
  return (
    <main className="w-auto flex items-center flex-col">
      <div className="mx-auto inline-flex items-center flex-col mt-32 ">
        <p className="self-end text-2xl text-gray-500">
          このクライアントは私の牙になる
        </p>
        <div className="flex justify-center items-center ">
          <img src="ivory-logo.png" className="title-logo"></img>
          <h1 className="title-text ml-2">ivory</h1>
        </div>
        <p className="text-2xl mt-6">PC用Mastodonアプリ</p>
      </div>
      <Button className="inline-block w-auto px-8 mt-16">
        Mastodonでログインする
      </Button>
    </main>
  );
};
