---
layout: post
title: OPENWRT学习随录 (IV) – iw
categories:
  - Embedded
tags:
  - '802.11'
  - iw
  - Linux
  - OpenWRT
  - Wireless
draft: false
id: 526
date: 2015-07-24 09:43:00
permalink:
description:
cover_img:
toc-disable:
comments:
---

iw是一个linuxwireless支持的package，之前在android开发中为了加快扫描速度而在root的设备上使用，这一次，我们要将其利用在OpenWRT上，索性写一个完整的介绍。

具体的文档信息都可以从linuxwireless的[网站](http://linuxwireless.org/en/users/Documentation/iw/)上查询到。

### 1\. 关于iw

iw是一个新的为无线网络设备配置工具，基于[nl80211](http://linuxwireless.org/en/developers/Documentation/nl80211/)命令行配置工具集。

它支持大多数最新添加到kernel中的驱动。iw是被用于取代[iwconfig](http://linuxwireless.org/en/users/Documentation/iw/replace-iwconfig)的。

iwconfig使用Wireless Extensions Interface，如今已经过时，linuxwirelss组织推荐使用iw和nl80211来取代它。

### 2\. 获取iw

使用git

> git: http://git.sipsolutions.net/iw.git

或者前往linuxwireless.org下载[发布版](https://www.kernel.org/pub/software/network/iw/)。

### 3\. 依赖

使用iw需要有libnl，大多数操作系统预装1.1，如果版本不对，请重新[下载](http://www.infradead.org/~tgr/libnl/)编译。libnl中引入了genl，Generic Netlink，是nl80211所依赖的。

### 4\. command

#### help指令

> iw help

#### 查看设备信息

> iw list

可以查看到相关的有用信息

#### 扫描指令

> iw dev wlan0 scan

#### 列出事件

> iw event

当调试时，用以下命令对查看auth/assoc/deauth/disassoc frames很有用

> iw event -f

有时候还需要查看定时信息

> iw event -t

#### 获取连接状态

你可以使用以下命令确定你是否连接到一个AP和最近一次传送速率

> iw dev wlan0 link

假设连接到一个802.11n的AP，打印信息如下：

> Connected to 68:7f:74:3b:b0:01 (on wlan0)
>           SSID: tesla-5g-bcm
>           freq: 5745
>           RX: 30206 bytes (201 packets)
>           TX: 4084 bytes (23 packets)
>           signal: -31 dBm
>           tx bitrate: 300.0 MBit/s MCS 15 40Mhz short GI

#### 建立基本的连接

首先，想要连接的AP往往是两种类型的：

1.  未加密
2.  采用WEP方式加密

如果你在一个比较忙的网络中，很容易掉线，你需要重发命令验证.如果想要避免如此仅需要使用[wpa_supplicant](http://linuxwireless.org/en/users/Documentation/wpa_supplicant/)，它可以自动重连。

如果你想自己处理掉线，你可以使用以下命令：

连接到SSID为foo未加密的网络：

> iw wlan0 connect foo

加入你有两个SSID为foo的AP，并且你想连接的是频率2432的，你可以使用以下命令:

> iw wlan0 connect foo 2432

连接到使用WEP的AP,可以使用:

> iw wlan0 connect foo keys 0:abcde d:1:0011223344

#### 获取站点统计数据

获取站点统计数据如发送和接收字节数，最近传送比特率，可以使用以下命令：

> iw dev wlan1 station dump

打印信息如下:

> Station 12:34:56:78:9a:bc (on wlan0)
>          inactive time:  304 ms
>          rx bytes:       18816
>          rx packets:     75
>          tx bytes:       5386
>          tx packets:     21
>          signal:         -29 dBm
>          tx bitrate:     54.0 MBit/s

#### 获取具体的统计数据

> iw dev wlan1 station get <peer-MAC-address>

<peer-MAC-address> 是AP的MAC地址。

#### 修改传送比特率

可以设置一个指定的比特率如：

> iw wlan0 set bitrates legacy-2.4 12 18 24

设置MCS速率：

> iw dev wlan0 set bitrates mcs-5 4
>   iw dev wlan0 set bitrates mcs-2.4 10

想要重置，则不添加参数：

> iw dev wlan0 set bitrates mcs-2.4
>   iw dev wlan0 set bitrates mcs-5

#### 设置发送功率

可以设置发送功率，即可以使用设备接口名称dev也可以使用phy：

> iw dev <devname> set txpower &lt;auto|fixed|limit> [<tx power in mBm>]
>   iw phy <phyname> set txpower &lt;auto|fixed|limit> [<tx power in mBm>]

#### 节能模式

开启节能模式:

> iw dev wlan0 set power_save on

查询当前节能模式设置:

> iw dev wlan0 get power_save

#### 用iw添加接口

支持以下几种Wireless Operating Modes模式：

1.  monitor 监听模式
2.  managed [also station] Client模式
3.  wds 无线分布式 中继模式
4.  mesh [also mp]5.  ibss [also adhoc] Independent Basic Service Set 点对点模式

具体这些模式的用法可以查看这个[文档](http://linuxwireless.org/en/users/Documentation/modes/)

例如添加一个monitor的接口

> iw phy phy0 interface add moni0 type monitor

monitor是模式的名称，而moni0是接口的名称，也可以替换phy0为你硬件对应的接口名称，默认情况下可以使用phy0

#### 用iw删除接口

> iw dev moni0 del

#### 用iw设置频点

> iw dev wlan0 set freq 2412 [HT20|HT40+|HT40-]

#### 用iw设置通道

> iw dev wlan0 set channel 1 [HT20|HT40+|HT40-]