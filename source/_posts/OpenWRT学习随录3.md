---
layout: post
title: "OpenWRT学习随录 (III): OpenWRT运行C"
categories:
  - "OpenWRT学习随录"
tags:
  - "Linux"
  - "无线"
draft: false
id: 505
date: 2015-07-22 13:00:36
toc_number_disable: true
permalink:
description:
cover_img:
comments:
---

> 这一篇开始，我要开始实践一下内容，选择的是Ubuntu 12.04 和 Mac OS X Yosemite，参考教程来自于[OpenWRT WIKI](http://wiki.openwrt.org/doc/howto/buildroot.exigence)。必须使用非ROOT用户操作，如果使用ROOT进行操作的话，会提示检查失败，Checking ‘non-root’...failed. 另外温馨提示，目录不能含有空格。

### 1. 准备工作，安装依赖包和一些utilties

#### 1.1 在Linux上

首先要安装git来下载OpenWRT的源码，以及build tools来完成交叉编译过程

> sudo apt-get update
>   sudo apt-get install git-core build-essential libssl-dev libncurses5-dev unzip

linux操作系统上面开发程序， 光有了gcc 是不行的，它还需要 build-essential软件包用于提供编译程序必须软件包的列表信息。也就是说，编译程序有了这个软件包，它才知道头文件在哪，才知道库函数在哪，还会下载依赖的软件包 ，最后才组成一个开发环境。

当然，除了git，也许下载代码也需要subversion（svn）或者mercurial，这样可以同样把这两个包装上

> sudo apt-get install subversion mercurial

为了以防万一，这里有一个及其完整的command：

> sudo apt-get install g++ libncurses5-dev zlib1g-dev bison flex unzip autoconf gawk make gettext binutils patch bzip2 libz-dev asciidoc subversion build-essential qemu-user git libssl-dev libssl0.9.8

#### 1.2 在Mac OSX上

首先，在Mac OSX上，首先先安装编译工具Xcode command line tools或者Xcode，可以从Mac App Store上得到

然后，安装[homebrew](http://brew.sh/)，一条ruby脚本：

> ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

再次，为homebrew添加一个repository：

> brew tap homebrew/dupes

再次，安装依赖包coreutils findutils gawk gnu-getopt gnu-tar grep wget：

> brew install coreutils findutils gawk gnu-getopt gnu-tar grep wget

由于gnu-getopt是keg-only的，强制链接：

> brew ln gnu-getopt --force

最后，给.bash_profile写入以下：

> PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"

以上完成了，还是不够的，究其缘由就是前面提到，必须需要一个Case-sensetive的FS，而Mac OS X，则是一个Case-insensitive的文件系统，[这里](http://wiki.openwrt.org/easy.build.macosx)给出了解决方案，从Mac上的HDD上分割一块20g，取名叫做OpenWrt.dmg，然后挂载：

> hdiutil create -size 20g -fs "Case-sensitive HFS+" -volname OpenWrt OpenWrt.dmg
>   hdiutil attach OpenWrt.dmg

那么接下来，打开所在目录，并且以下操作都在其中完成。

> cd /Volumes/OpenWrt
>   mkdir openwrt

### 2. git源代码

一条指令

> git clone git://git.openwrt.org/openwrt.git

完成之后，可以在当前目录下发现一个新的目录openwrt，这个就是OpenWRT Buildroot的构建目录，其中，OpenWRT toolchain “OpenWrt Buildroot”被包含在其中。

### 3. 更新和安装所有可用的feeds

feeds即一些具有共同位置的软件包的打包集合，feeds可以放在远程服务器上，也可以放在本地文件系统里，可以通过一个url获取到。

> cd openwrt
>   ./scripts/feeds update -a
>   ./scripts/feeds install -a

### 4. make得到一个configuration menu

指令3选1，普遍选择最后一个：

> make defconfig
>   make prereq
>   make menuconfig

### 5.按照需求选择自己需要make的内容

Target system 可以选择对应的处理器芯片
SubTarget选择具体的板子型号
如果需要其他内容，则可以加入其他软件包一起编译

然后键入这个命令就开始编译：

> make V=99

如果使用的机器是多核处理器，可以执行下面命令使用多线程编译：

> make –j2 V=99

上面是一个双核的例子，切记不要直接使用make –j V=99，，这是无数线程编译，可能导致宕机。这一步需要花费数小时，甚至可能因为各种原因被迫重新开始。

### 6. 编译完成

如果能过顺利通过上述步骤到达这里，那么首先恭喜，可以检查一下，从staging_dir这个目录下发现三个子目录:

> host
>   target-xxx_xxxxxxx
>   toolchain-xxx_xxxxxx

这个时候，我们需要修改下系统路径

> sudo vim /etc/profile

在最后加入需要设置变量的shell语句：

> export STAGING_DIR=(your_dir)/(openwrt_dir)/staging_dir/toolchain-xxx_xxxxx
>   export PATH=$PATH:$STAGING_DIR/bin

编辑保存退出后，restart，变量生效。

your_dir就是所在目录，注意MAC OS X下经过分区后，your_dir就是/Volumes/OpenWrt，而openwrt_dir就是之下建立的文件目录，比如openwrt/

### 7. 写一个 hello world

> sudo vim hello.c

```C

#include <stdio.h>

int main(void){
    printf("hello!!!!\n");
    return 0;
}

```

编译，使用指令

> mips-openwrt-linux-gcc hello.c -o hello.o -static

如果不指定PATH，也可以这样

> (your_dir)/(openwrt_dir)/staging_dir/toolchain-xxx_xxxxx/bin/mips-openwrt-linux-gcc hello.c -o hello.o -static

编译到此完成。

### 8. 上传 执行

代码可以上传到openwrt的路由器上执行，scp过去：

> sudo scp hello.o 192.168.1.1:hello.o

ssh到路由器上

> sudo ssh 192.168.1.1
>   cd ~
>   ./hello.o

得到运行结果，那么简单的SDK环境已经搭建完毕。
