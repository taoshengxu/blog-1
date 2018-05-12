---
layout: post
title: "OpenWRT学习随录 (II): OpenWRT Buildroot"
categories:
  - "OpenWRT学习随录"
tags:
  - Linux
  - "嵌入式"
  - "无线"
draft: false
id: 511
date: 2015-07-22 12:13:07
toc_number_disable: true
permalink:
description:
cover_img:
comments:
---

> OpenWRT Buildroot是一个autotools，或者叫buildsystem，用于构建OpenWRT版本系统，这个工具可以运行在Linux，BSD和MacOSX之上。
> Buildroot对于字母大小写有着严格的要求，所以windows下的cygwin不能支持它。

### 1. 关于OpenWRT Buildroot

OpenWRT Buildroot是由一系列Makefiles和patches文件组成的，它允许用户方便地生成一个交叉编译工具链[toochain](https://en.wikipedia.org/wiki/Toolchain)和根文件系统rfs。OpenWRT Buildroot是根据Buildroot修改二来的，其中，交叉编译工具链使用的是[uClibc](https://en.wikipedia.org/wiki/UClibc)，这是一个C标准库。

交叉编译器的概念同传统的编译器的区别就在于主机和目标机的关系上

> 传统的编译器是运行在主机上，而生成代码也是可以跑在主机上的。例如，在一个x86架构的Linux上，编译工具链使用一个C标准库来编译代码，编译后的代码也是运行在x86的处理器上的。
>
>   那么交叉编译器可以这么认为，编译工具链是运行在host system上，然而生成的代码确实提供给target system使用，包括处理器的指令集也是target system的。例如，交叉编译器跑在x86的Linux系统上，编译后的文件是可以在MIPS32架构的某个嵌入式系统上运行的。

另外，OpenWRT的Makefile有自己的特定语法，与Linux上的Makefile存在区别，OpenWRT Makefile定义package的meta infomation，去哪下载这个package，如何便利，把编译后的二进制文件放到哪儿等等。

### 2. OpenWRT Buildroot特性

1.  安装软件非常简单
2.  使用Linux Kernel Menuconfig进行功能配置
3.  提供集成的交叉编译工具链，如gcc，ld等
4.  提供autotools（automake，autoconf），cmake，scons的抽象化
5.  处理标准化的下载，补丁，配置，编译等
6.  提供一定数量的坏包修复功能

### 3. Buildroot的交叉编译工具链cross-compilation toolchain

包括三个部分：

1.  一个编译器，gcc
2.  binary utils比如汇编器、连接器，binutils
3.  一个C标准库 uClibc or GNU Libc or dietilbc

### 4. Buildroot的build序列

1.  tools – automake, autoconf, sed, cmake
2.  toolchain/binutils – as, ld, …
3.  toolchain/gcc – gcc, g++, cpp, …
4.  target/linux – kernel modules
5.  package – core and feed packages
6.  target/linux – kernel image
7.  target/linux/image – firmware image file generation

### 5. 安装需要

ca. 200 MB of hard disk space for OpenWrt Buildroot
ca. 300 MB of hard disk space for OpenWrt Buildroot + OpenWrt Feeds
ca. 2.1 GB of hard disk space for source packages downloaded during build from OpenWrt Feeds
ca. 3-4 GB of available hard disk space to build (i.e. cross-compile) OpenWrt and generate the firmware file
ca. 1-4 GB of RAM to build Openwrt.(build x86's img need 4GB RAM)
