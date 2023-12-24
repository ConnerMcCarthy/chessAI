# https://chessai.xyz/chessle

## How To Play
This is an open source Wordle-like chess game. Original Here: https://jackli.gg/chessle/

The goal is to guess the correct chess opening. You will make moves for both black and white. To make a move drag the piece on the board.

Analysis mode will allow you to ask questions about the position displayed on the board!

## Project Goals 

1. Create website and chessboard :heavy_check_mark:
2. Match opening moves :heavy_check_mark: 
3. Add move validation and Chessle logic :heavy_check_mark:
4. Custom analysis w/ openai :heavy_check_mark:
5. Clean UI w/ mobile support
6. Daily opening generation w/ openai
7. GPT4 API | Custom chess notation for improved analysis
8. Move ChessAI analysis and Chessle game to seperate web pages


## UI 
v0.2
![v0.2](https://i.imgur.com/lFcym1O.png)
![v0.2 analysis](https://i.imgur.com/Fo2DAXd.png)

## Tools
- Django 4.2.1
- chessboard.js 1.0.0
- chess.js 0.12.0

Server
- ec2
- gunicorn + nginx
- https and secure -- https://www.ssllabs.com/ssltest/analyze.html?d=chessai.xyz

## Game Logic

- [chessle.html](https://github.com/ConnerMcCarthy/chessAI/blob/main/chessAI-project/chessle/templates/home.html) 

- [chessle.js](https://github.com/ConnerMcCarthy/chessAI/blob/main/chessAI-project/chessle/static/js/setupboard.js)

(will update file names)
