---
title: SSH-操作
date: 2024-07-22 16:20:41
tags: 
 - SSH
categories:
 - 网络协议
 - SSH
---


# 一、安装操作
## 1. **OpenSSH Client（openssh-client）**：这个客户端工具允许用户通过SSH协议连接到远程主机。常用的命令包括：
   - `ssh`：用于安全远程登录。
   - `scp`：用于安全复制文件。
   - `sftp`：用于安全文件传输。
   - `ssh-keygen`：用于生成和管理SSH密钥。
   - `ssh-copy-id`：用于将本地生成的SSH公钥复制到远程主机的授权密钥文件中，以便实现无密码登录。

2. **OpenSSH Server（openssh-server）**：这个服务器端工具允许远程用户通过SSH协议连接到这台机器。主要组件包括：
   - `sshd`：SSH守护进程，处理和管理SSH连接。
   - 配置文件通常位于`/etc/ssh/sshd_config`，可以在这里进行各种设置，如端口、认证方式、允许或禁止的用户等。

要检查Ubuntu 24.04是否已安装OpenSSH工具包，可以使用以下命令：

```bash
dpkg -l | grep openssh

sudo apt update
sudo apt install openssh-client openssh-server
```

# 二、查看SSH服务的版本


## 1. **查看OpenSSH客户端版本**：
   ```bash
   ssh -V
   ```
   这将输出类似于以下的信息：
   ```
   OpenSSH_8.9p1, OpenSSL 1.1.1n  15 Mar 2022
   ```

## 2. **查看OpenSSH服务器版本**：
   首先确保SSH服务器正在运行，然后使用以下命令连接到本地SSH服务器并查看其版本信息：
   ```bash
   ssh -V localhost
   ```
   这将返回客户端和服务器的版本信息。如果只需要查看服务器版本信息，可以查找`sshd`守护进程的版本：
   ```bash
   sudo sshd -T | grep version
   ```
   这将输出类似于以下的信息：
   ```
   sshd version OpenSSH_8.9p1, OpenSSL 1.1.1n  15 Mar 2022
   ```

# 三、启动操作

## 1.开启端口防火墙策略

```shell
sudo apt install ufw
sudo ufw enable
sudo ufw allow 22
sudo ufw status
```

## 2.自定义开放端口(可选)

```shell
sudo ufw allow 2222
sudo ufw status
```
## 3.启动SSH服务

```shell
sudo systemctl start ssh
sudo systemctl enable ssh  //自启动命令
sudo systemctl status ssh

/etc/ssh/sshd_config   // 配置文件所在位置
```

# 四、退出操作（exit）

### 方法1：使用`exit`命令

在SSH会话中，可以使用`exit`命令退出会话并断开连接：

```bash
exit
```

或者按 `Ctrl+D` 组合键，也可以关闭当前的SSH会话。

### 方法2：使用`logout`命令

在某些系统上，可以使用`logout`命令断开SSH连接：

```bash
logout
```

### 方法3：关闭终端

如果你是在终端（如gnome-terminal、xterm、tmux等）中运行的SSH连接，直接关闭终端窗口也会断开SSH连接。

### 方法4：使用`kill`命令（强制断开）

如果需要强制断开SSH连接，可以在本地终端上找到SSH进程并杀掉它：

1. 找到SSH进程的PID：
   ```bash
   ps aux | grep ssh
   ```

2. 使用`kill`命令终止进程（替换`<PID>`为实际的进程ID）：
   ```bash
   kill <PID>
   ```

3. 如果`kill`命令无法终止进程，可以使用`kill -9`强制终止：
   ```bash
   kill -9 <PID>
   ```

### 方法5：使用`tmux`或`screen`分离会话（可选）

如果你在SSH会话中使用了`tmux`或`screen`，可以分离（detach）会话，而不会真正断开连接：

- 在`tmux`中，按下 `Ctrl+B` 然后按 `D` 键。
- 在`screen`中，按下 `Ctrl+A` 然后按 `D` 键。

这将分离会话，但会话仍在远程主机上运行，你可以稍后重新连接。

### 例子

假设你当前在SSH会话中，只需键入`exit`并按回车即可：

```bash
exit
```


# 五、认证操作

## （1）账号密码连接

```shell
ssh ubuntu@192.168.179.141
```

## （2）公私钥认证连接

