---
layout: post
title: "OpenWRT学习随录 (I): OpenWRT介绍"
categories:
  - "OpenWRT学习随录"
tags:
  - Linux
  - embedded
  - OpenWRT
  - Router
  - Wireless
draft: false
id: 501
date: 2015-07-22 10:21:27
toc_number_disable: true
permalink:
description:
cover_img:
comments:
---

### 1. OpenWRT渊源

OpenWRT很多人知道是一个小型的opensource的Linux系统，然而它的诞生也是充满了戏剧色彩。Linksys WRT54G是Linksys在2003年发布的基于802.11g标准的无线路由器，理论带宽逼近802.11b的11M带宽，达到了54M，这个水平在当年得到了很大关注。于是，有相关爱好者发现了它的固件是基于Linux，而Linux是基于GPL Linsence的，也就是说，WRT54G基于Linux修改的代码按照Linsence规定必须开源，迫于此种压力，母公司Cisco选择将其固件源代码公开。在这种背景下，OpenWRT随着当时一批基于该开源代码的项目一起诞生了。

OpenWRT相比其他基于WRT54G修改的固件，有它的独到之处，OpenWRT一开始就选择了重构，从零开始include各类软件包，而其最成功之处，莫过于可以对File System进行写操作，使得开发者无需每一次小修改就重新complie，这也就是大多数人将其看做小型Linux系统的主要原因。

### 2. OpenWRT的发展

OpenWRT开始于2004年1月，首个版本即基于WRT54G的GPL源码+uclibc的buildroot项目。2005年开始，新的开发人员在之前的“stable version”上，开始舍弃WRT54G的源码，采用buildroot2作为其核心技术，将OpenWRT模块化，这个版本使用Linux 2.4.3x发行版的核心源码，加入一些网络驱动以及补丁文件，还有一些免费工具，后来这个版本称之为“White Russian”。

OpenWRT在06之后迎来了迅猛发展时期，之前OpenWRT仅仅支持broadcom博通公司的Soc，这之后，开始支持Intel IXP为首的ARM平台，同时还有MIPS 24K R2，x86,和PowerPC。在UI方面，则有现在LuCi和Webif这些软件应用被加入。

### 3. OpenWRT特色

概括来说，OpenWRT就是一个提供了完全可写文件系统及软件包管理的网络设备嵌入式系统，并且它是开源的。它允许开发人员使用软件包的概念来定制嵌入式设备，使得其受众面广。

于开发人员讲，OpenWRT提供建议的环境框架来构建各种应用。与用户来讲，代表着Freedom，个性化定制等等。

首先，它是开源和免费的，OpenWRT站点上的资源提供给广大的开发者和用户下载。

其次，它是轻巧和简易的，作为低门槛的嵌入式系统，允许用户以所需的访问权限进行修改和定制。

最后，它是快速发展的，社区贡献的力量驱动其不断发展和改进。

### 4. OpenWRT开发过程

OpenWRT的底层是构建在各类处理器平台（ARM，PowerPC或MIPS）之上的，一般的开发过程是这样的

> 1.  创建Linux的交叉编译环境
> 2.  建立Bootloader
> 3.  移植Linux内核并构建嵌入式设备的驱动程序
> 4.  编译并安装软件包
> 5.  建立根文件系统Rootfs
> 6.  Debug

OpenWRT的开发，从交叉编译器到Linux内核再到rfs甚至于bootloader都整合在一起，形成了完整的SDK环境。