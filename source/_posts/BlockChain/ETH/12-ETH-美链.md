---
title: 12-ETH-美链
date: 2024-07-31 23:52:09
tags:
  - BlockChain
  - ETH
categories:
  - BlockChain
  - ETH
---
# 美链(一种代币)
- 只是一个智能合约。
- 有自己的代币BEC.
- ICO(Initial Coin offering)
- 没有自己的链，代币的交易都是通过智能合约的函数来实现的。
- 可以自定义规则，每个账户有多少代币存储在智能合约的状态变量里面。
- ERC 20是以太坊的代币的一个标准，规范了所有发行的合约应该实现的功能和遵循的接口。（Ethereum Request for Comments）
- 美链中有一个叫做batchTransfer的函数，功能是向多个接收者发送代币，把这些代币从调用者里面扣除。
![](./pic/Pasted%20image%2020240731231353.png)

- 数据乘法溢出。
- 发送的很多。
- 减少的很少。

# 考虑是不是溢出

# safemath库自动判断是否溢出
