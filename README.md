# discord-today-anime

24時間以内に放送されるアニメのタイトルをdiscordに流します。

## development

```
cp .env.sample .env
```

- .envにdiscordAppのCLIENT IDとアニメ評価用チャンネルのIDを設定して下さい

## スクリプト

### start

`npm run compile` を先に実行しないとエラーが出るよ！

```bash
npm start
```

### start:dev

ts-nodeを使って実行します。(コンパイル不要)

```bash
npm run start:dev
```

### compile

コンパイルします。

```bash
npm run compile
```

### compile:test

コンパイルします。(ファイルを出力しない)

```bash
npm run compile:test
```

### lint

静的検証ツール(ESLint)を使って問題を調べる。

```bash
npm run lint
```

### lint:fix

問題を修正する。

```bash
npm run lint:fix
```
