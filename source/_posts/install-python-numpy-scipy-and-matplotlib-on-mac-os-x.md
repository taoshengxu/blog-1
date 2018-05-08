---
layout: post
title: 'Install Python, NumPy, SciPy, and matplotlib on Mac OS X'
categories:
  - Mac
  - Python
tags:
  - Mac
  - matplotlib
  - numpy
  - Python
  - scipy
draft: false
id: 182
date: 2013-05-30 19:26:41
permalink:
description:
cover_img:
toc-disable:
comments:
---

**Update: These instructions are over a year old, though they may still work for you. See the [“Install Python”](http://penandpants.com/install-python/ "Install Python") page for the most recent instructions.**

A bit ago a friend and I both had fresh Mac OS X Lion installs so I helped him set up his computers with a scientific Python setup and did mine at the same time.

These instructions are for Lion but should work on Snow Leopard or Mountain Lion without much trouble. On Snow Leopard you won’t install Xcode via the App Store, you’ll have to download it from Apple.

After I’d helped my friend I found [this blog post](http://www.thisisthegreenroom.com/2011/installing-python-numpy-scipy-matplotlib-and-ipython-on-lion/) describing a procedure pretty much the same as below.

Update: If doing all the stuff below doesn’t seem like your cup of tea, it’s also possible to install Python, NumPy, SciPy, and matplotlib using double-click binary installers (resulting in a much less flexible installation), [see this post](http://penandpants.com/2012/03/01/install-python-2/) to learn how.

# Xcode

You will need Apple’s developer tools in order to compile Python and the other installs. On Lion you can install [Xcode from the App Store](https://developer.apple.com/xcode/), on Snow Leopard you’ll have to get an older Xcode from [developer.apple.com](http://developer.apple.com/downloads).

I use the Xcode editor because I like its syntax highlighting, code completion, and organizer. However, I use hardly any of its features and unless you’re an iOS or Mac developer you probably won’t either. If you prefer another editor it’s possible to get only the libraries and compilers that you need with the [Command Line Tools for Xcode](http://developer.apple.com/downloads). (You’ll need a free Apple ID.) (See also [http://www.kennethreitz.com/xcode-gcc-and-homebrew.html](http://www.kennethreitz.com/xcode-gcc-and-homebrew.html).)

# Homebrew

[Homebrew](http://mxcl.github.com/homebrew/) is an excellent package manager for Mac OS X that can install a [large number of packages](https://github.com/mxcl/homebrew/tree/master/Library/Formula). To install it simply launch a terminal and enter

    ruby -e "$(curl -fsSkL raw.github.com/mxcl/homebrew/go)"

Homebrew installs things to `/usr/local/` so you don’t need `sudo` permissions. To add Homebrew installed executables and Python scripts to your path you’ll want to add the following line to your `.profile` (or `.bash_profile`) file:
<pre> export PATH=/usr/local/bin:/usr/local/share/python:$PATH</pre>
Normal executables go in `/usr/local/bin/` and Python scripts installed by Homebrew go in`/usr/local/share/python/`.

See [https://github.com/mxcl/homebrew/wiki/The-brew-command](https://github.com/mxcl/homebrew/wiki/The-brew-command) or type `brew help` or `man brew`for more info on Homebrew.

# Install [Python](http://www.python.org/)

Now that you’ve got Homebrew installing Python is simple:
<pre>brew install python</pre>
Homebrew will install a couple of packages required by Python and then Python itself. Don’t be surprised if this takes a couple minutes.

**Important: You should close your terminal and open a fresh one right now so that it has the updated PATH from the previous section. **Otherwise you run the risk of executing the wrong scripts during the rest of these instructions.

At this point you should be able to get a fresh terminal and type
<pre>which python</pre>
and see
<pre>/usr/local/bin/python</pre>
Homebrew is for installing system packages and tools; for managing Python add-ons we want[pip](http://pypi.python.org/pypi/pip). Luckily easy_install, another Python package manager is installed by Homebrew and we can use it to install pip:
<pre>easy_install pip</pre>

# Install [NumPy](http://www.scipy.org/)

Use pip to install NumPy:
<pre>pip install numpy</pre>
This should install NumPy 1.6.1 (as of Feb. 2012).

# Install [SciPy](http://www.scipy.org/)

We need gfortran to compile SciPy but it is not included with the other Xcode tools. Luckily, Homebrew can help us out again:
<pre>brew install gfortran</pre>
When that’s done it’s a cinch to install SciPy:
<pre>pip install scipy</pre>
This should install SciPy 0.10.

# Install [matplotlib](http://matplotlib.sourceforge.net/)

To install matplotlib we need to revisit Homebrew one more time:
<pre>brew install pkg-config</pre>
And the usual pip command:
<pre>pip install matplotlib</pre>
This should install matplotlib 1.2.0\. If it doesn’t you can try installing from the matplotlib development repo:
<pre>pip install git+git://github.com/matplotlib/matplotlib.git</pre>
Congratulations! You should now have the basics of a scientific Python installation that’s easy to manage and upgrade using Homebrew and pip. Fire up Python and make sure things worked. The following should work in Python with no errors:
<pre>import numpy
import scipy
import matplotlib</pre>