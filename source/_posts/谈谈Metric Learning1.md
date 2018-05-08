---
layout: post
title: 谈谈Metric Learning（I）
categories:
  - Machine Learning
  - Research
tags:
  - ITML
  - LMNN
  - metric
  - metric learning
  - similarity measurement
draft: false
id: 347
date: 2015-06-03 10:41:01
permalink:
description:
cover_img:
toc-disable:
comments:
---

最近在学Metric Learning，主要解决在Indoor Sensor Network中对各类传感数据特征的提取和转换的问题，Metric Learning自从02年以来得到了很多关注，虽然有人诟病它是【子空间学习】换汤不换药的产物，但是也许，换个说法它的确会受到更多关注，从而在不断发展中显出价值。

### 1\. 关于Metric

1.  pairwise metrics往往是用于度量两个对象相似度（similarity or distance）的；
2.  metrics在machine learning中无处不在，选择一个有效的metric，往往能够简化问题，提高解决问题的效率和效果；
3.  metric的应用场景包括【分类】【聚类】【信息检索和排序】【高维数据可视化】等.

### 2\. Metric基础

#### 2.1 距离函数(distance function)定义

> A distance over a set [latex]\mathit{X}[/latex] is a pairwise function [latex]d: \mathit{X} \times \mathit{X} \rightarrow \mathbb{R}[/latex] which satisfies the following properties [latex]\forall x, x', x'' \in \mathit{X}[/latex]:

1.  Nonnegativity : [latex]d(x,x') \geq 0[/latex]
2.  Identity of Indiscernibles : [latex]d(x,x') = 0[/latex] if and only if [latex]x = x'[/latex]
3.  Symmetry : [latex]d(x,x') = d(x',x)[/latex]
4.  Triangle Inequality : [latex]d(x,x'') \leq d(x,x') + d(x',x'')[/latex]

#### 2.2 相似函数(similarity function)定义

> a (dis)similarity function is a pairwise function [latex]\mathit{K}: \mathit{X} \times \mathit{X} \rightarrow \mathbb{R}[/latex].
> 
>   [latex]\mathit{K}[/latex] is symmetric if [latex]\forall x,x' \in \mathit{X}, \mathit{K}(x,x') = \mathit{K}(x',x)[/latex].

#### 2.3 Minkowski distances

> [latex]d_p(x,x') = ||x - x'||_p = (\sum\limits_{i=1}^{d}|(x_i - x'_i)^{p}|)^{\frac{1}{p}}[/latex]

for [latex]p=1[/latex], Manhattan distance 曼哈顿距离
for [latex]p =2[/latex], Euclidean distance 欧氏距离
for [latex]p \rightarrow \infty[/latex], Chebyshev distance 切比雪夫距离，相当于取各维度差的最大值

#### 2.4 Manhalanobis distance

> [latex]d_M(x,x') = \sqrt{(x-x')^TM(x-x')}[/latex].

其中，[latex]M[/latex]是一个对称半正定矩阵（symmetric PSD matrix），对于[latex]M[/latex]的解释，可以这样认为，假设[latex]x,x'[/latex]是随机向量，符合同样的分布，且其协方差矩阵（covariance matrix）是[latex]\Sigma[/latex]，那么，我们可得到[latex]M = \Sigma^{-1}[/latex].

#### 2.5 Cosine distance

在data mining和信息检索中一个常用的metric是cosine distance，在bag-of-words和sparse vectors中都有很好的应用，是这样定义的：

> [latex]K_{cos}(x,x') = \frac{x^Tx'}{||x||_2||x'||_2}[/latex]

类似于计算两个vector的夹角，即方向上有多靠近，下标用的是二范数。

#### 2.6 Bilinear similarity

与2.4写出的马氏距离Manhalanobis distance类似，是由一个矩阵[latex]M \in \mathbb{R}^{d \times d}[/latex]来parameterize的，但不要求为半正定或者对称

> [latex]K_M(x,x') = x^TMx'[/latex]

#### 2.7 KL散度

又称KL距离，KL-divergence，常用来衡量两个概率分布的距离。

先从熵（entropy）开始说起：

给定一个字符集的概率分布$latex \mathit{X} $，可设计一种编码，使得表示该字符集组成的字符串平均需要的比特数最少。对[latex]x \in \mathit{X}[/latex]，设其出现概率为[latex]P(x)[/latex]，那么其最优编码平均需要的比特数等于这个字符集的熵为

> [latex]H(x) = \sum\limits_{x \in \mathit{X}} P(x) {log}{\frac{1}{P(x)}}[/latex]

如此，同样的字符集上，假设存在另一个概率分布[latex]Q(X)[/latex]。如果用概率分布[latex]P(X)[/latex]的最优编码（即字符x的编码长度等于[latex]log(\frac{1}{P(x)})[/latex]，来为符合分布[latex]Q(X)[/latex]的字符编码，那么表示这些字符就会比理想情况多用一些比特数。

KL-divergence就是用来衡量这种情况下平均每个字符多用的比特数，因此可以用来衡量两个分布的距离。表达公式为：

> [latex]D_{KL}(Q||P) = \sum\limits_{x \in \mathit{X}} Q(x) {log}{\frac{1}{P(x)}} - \sum\limits_{x \in \mathit{X}} Q(x) {log}{\frac{1}{Q(x)}} = \sum\limits_{x \in \mathit{X}} Q(x) {log}{\frac{Q(x)}{P(x)}}[/latex]

KL散度是不对称的，且KL散度始终是大于零的， 简单的证明[在此](http://blog.csdn.net/caohao2008/article/details/6910794)。

### 3\. 凸优化 Convex optimization

凸优化实在是太过于重要，这里应该有很多篇幅来讲，这里只讲对于后续有用的一些重要性质

1.  function [latex] f : \mathbb{R}^n \rightarrow \mathbb{R}[/latex] is convex if [latex]x_1, x_2 \in \mathbb{R}^n, 0 \leq a \leq 1 \Rightarrow f(ax_1 + (1-a)x_2) \leq af(x_1) + (1-a)f(x_2)[/latex]
2.  function [latex] f : \mathbb{R}^n \rightarrow \mathbb{R}[/latex] is convex iff its Hessian matrix [latex]\triangledown^2f(x)[/latex] is PSD
3.  if function [latex] f : \mathbb{R}^n \rightarrow \mathbb{R}[/latex] is convex, then any local minimum of function [latex] f [/latex] is also a global minimum of [latex] f [/latex]

在凸优化中常用的投影梯度下降算法请看[这里](http://goo.gl/7Q46EA)。

-----------------分割线-----------------

好了，这些都准备好了，下一期我们开始讲讲Metric Learning的主要思想和一些分支。再见！