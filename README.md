#  discord-qbit
A discord bot for qbittorrent

## About

This application is a discord bot, which can be used to easily manage all your qbittorrent clients by discord message.

## installation

See [Wiki](https://github.com/lushdog/discord-qbit/wiki)

## Usage

After the discord bot is established, You can send a message on the discord channel or dm the bot.

### Commands
All commands start with `!`.

#### Get torrents list
```
!list [flag]
```
##### Options
| Flag | Type | Description |
|------|------|-------------|
|  -s, --server    |    String  | Which server to operate|

example: 
```
!list -s serverA
```

#### Add torrent
```
!add [flag]
```
##### Options
| Flag | Type | Description |
|------|------|-------------|
|  `-s, --server`   |    String  | Which server to operate|
|  `-u, --urls`   |    String  | torrent file url|
|  `-l, --upLimit`<br>*optional*   |    String  | upload speed limit|
|  `-t, --tags`<br>*optional*   |    String  | add tag|
|  `-c, --cookie`<br>*optional*   |    String  | cookie credentials|
|  `-p, --paused`<br>*optional*   |    String  | don't start torrent|
|  `--part`<br>*optional*   |    Number  | how much partial file wanted |

example: 
```
!add -s serverA -u http://download.php?id=1 -l 120000000 -p --part 10
```
#### Purge torrents
```
!purge [flag]
```
##### Options
| Flag | Type | Description |
|------|------|-------------|
|  `-s, --server`   |    String  | Which server to operate|
|  `-u, --upspeed`<br>*optional*   |    String  | torrents which upload speed are under that speed(MB/s) get deleted |
|  `-t, --tracker`<br>*optional*   |    String  | filter tracker(keyword) |
|  `-n, --name`<br>*optional*   |    String  |filter torrent name(keyword) |
|  `-f, --filter`<br>*optional*   |    String  |filter torrent state, default is `completed`.  Allowed state filters: all, downloading, completed, paused, active, inactive, resumed, stalled, stalled_uploading, stalled_downloading |

example: 
```
!purge -s serverA -u 10 -t torrentleech -n BluRay
// delete torrents which tracker have 'torrentleech' keyword AND upload speed are under 10mb/s on serverA
```

#### Delete torrent
```
!remove [flag]
```
##### Options
| Flag | Type | Description |
|------|------|-------------|
|  `-s, --server`   |    String  | Which server to operate|
|  `-h, --hash`<br>*optional*   |    String  | torrent hash|
|  `-p, --presrveFiles`<br>*optional*   |    Boolean  | If set to true, the downloaded data will also not be deleted.|

example: 
```
!remove -s serverA -h 04ffb985d5b3ee87fb301ffedd164c7e3650e006
```

#### Find torrent hash
```
!find [flag]
```
##### Options
| Flag | Type | Description |
|------|------|-------------|
|  `-s, --server`   |    String  | Which server to operate|
|  `-n, --name`*   |    String  | torrent name keyword|

example: 
```
!find -s serverA -n The.Walking.Dead.S10E10
```
#### Get Transfer Info
```
!info [flag]
```
##### Options
| Flag | Type | Description |
|------|------|-------------|
|  `-s, --server`   |    String  | Which server to operate|

example: 
```
!info -s serverA
```
#### Get Torrents Stats
```
!stats [flag]
```
##### Options
| Flag | Type | Description |
|------|------|-------------|
|  `-s, --server`   |    String  | Which server to operate|
|  `-t, --tracker`<br>*optional*   |    String  | filter  tracker|
|  `-f, --filter`<br>*optional*   |    String  | filter torrent state, default is `completed`.  Allowed state filters: all, downloading, completed, paused, active, inactive, resumed, stalled, stalled_uploading, stalled_downloading |

## License

[The MIT License (MIT)](https://raw.githubusercontent.com/v2fly/v2ray-core/master/LICENSE)
