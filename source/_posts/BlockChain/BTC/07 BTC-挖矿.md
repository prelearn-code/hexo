---
title: 07 BTC-挖矿
date: 2024-07-22 20:20:47
tags: 
 - BTC
 - BlockChain
categories:
 - BlockChain
 - BTC
---
# 1. 基本原理

## 1. 基本逻辑

计算H(blockheader||none)<target_num


# 2.节点

### 全节点
![](./pic/Pasted%20image%2020240719175626.png)
### 轻节点
![](./pic/Pasted%20image%2020240719175705.png)

- 知道满足合法的阈值的节点。


# 3.挖矿设备

CPU：通用计算。
GPU：大规模通用并行计算。
ASIC(Application Specific Int Circuit)：专门挖矿使用的芯片。

# 4.矿池

- 一个矿主，全节点,负责组装区块。
- 多个矿工，只计算HASH值。
- 稳定收益。
- 降低难度进行挖矿，share

# 5.矿池拥有足够的算力

- 可以进行分叉攻击，把链进行分开，让自己的链成为最长合法快。
- Boycott：封锁账户，不让某个账户的交易上链或者在上链的时候就进行分叉攻击。

