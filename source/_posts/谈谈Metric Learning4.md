---
layout: post
title: 谈谈Metric Learning(IV) - ITML进阶
categories:
  - Machine Learning
tags:
  - kernel function
  - kernelization
  - metric learning
  - optimization
draft: false
id: 423
date: 2015-06-10 19:00:23
permalink:
description:
cover_img:
toc-disable:
comments:
---

### 1\. Kernel Learning Problem

对于Kernel Learning这个问题，我们可以这样认为：

给定一个kernel $latex K$, 我们在一些点集上同样有constraints，这个时候，为了使得这些点之间的pairwise distance服从constraints的情况，我们需要优化这个kernel，这就是kernel learning问题的基本定义。

相信你可以看到，这个定义已经和我们讨论的ITML有一定的相似性，我们先从[Kulis2006](http://dl.acm.org/citation.cfm?id=1143908)的这篇 low-rank kernel learning的文章来讲起：

对于low-rank kernel learning的输入，是一个specified kernel $latex K_0$, 我们的目标是使得我们需要的kernel $latex K$ 无限接近 $latex K_0$ ,而这种“接近”自然是由我们的LogDet divergence来衡量的，好了，那么对于这个问题。

首先，我们知道给定的$latex A_0$是如下形式的， $latex K_0 = X^TA_0X$，它是一个$latex n \times n$的方阵，优化问题如下：

> **_Equation.1_**
> 
>   $latex \min\limits_K~~D_{ld}(K, K_0)$
>   s.t. $latex K_{ii} + K_{jj} - 2K_{ij} \leq v ~~~~~ (i,j) \in S\\> 
>              K_{ii} + K_{jj} - 2K_{ij} \geq l ~~~~~ (i,j) \in D\\> 
> K \succeq 0$

### 2\. Kernel Learning和ITML的联系

现在已经看出一点端倪了，实际上这两个问题的关联在于如何证明$latex K$和$latex A$存在着“强关联”。回想下我们在[上一篇](http://wp.me/p61l9A-68)中介绍的关于$latex A$和$latex A_0$的LogDet优化：

> **_Equation.2_**
> 
>   $latex \min\limits_{A \succeq 0}~~D_{ld}(A,A_0)$
>   s.t. $latex tr(A(x_i - x_j)(x_i - x_j)^T) \leq v ~~~~ (i,j) \in S \\> 
>              tr(A(x_i - x_j)(x_i - x_j)^T) \geq l ~~~~ (i,j) \in D $

为了证明它们之间的关联，我们给出一个引理及其证明，如下：

> **_LEMMA 1._**
> 
>   给定$latex K = X^TAX$， 当且仅当$latex K$是Equation.1的可行解的情况下，$latex A$是Equation.2的可行解。
> 
>   _证明:_
>   $latex K_{ii} + K_{jj} - 2K_{ij}$可写成$latex (e_i - e_j)^TK(e_i - e_j) = (x_i - x_j)^TA(x_i - x_j)$。因此，对于similar constraint，$latex K_{ii} + K_{jj} - 2K_{ij} \leq v$等价于$latex tr(A(x_i - x_j)(x_i-x_j)^T) \leq v$。同理，适用于dissimilar constraint。

由上，我们可以给出一个定理及其证明：

> **_THEOREM 1._**
> 
>   给定Equation.1的最优解$latex K^*$及Equation.2的最优解$latex A^*$，必有$latex K^* = X^TA^*X$。
> 
>   _证明:_
> 
>   对于Equation.1的Bregman projection update 可写为：
> 
>   $latex A_{t+1} = A_{t} + \beta A_{t}(x_i - x_j)(x_i - x_j)^TA_{t}$
> 
>   对于Equation.2的Bregman projection update 则可写为：
> 
>   $latex K_{t+1} = K_{t} + \beta K_{t}(e_i - e_j)(e_i - e_j)^TK_{t}$
> 
>   优化的算法可以得出，两者当中使用的$latex \beta$是一致的，接下来可以归纳证明，在每一次迭代的过程中，都满足关系$latex K_t = X^TA_{t}X$（给定初始条件：$latex K_0 = X^TA_{0}X$）
> 
>   假设$latex K_t = X^TA_{t}X$则:
> 
>   $latex K_{t+1}\\> 
>  = K_{t} + \beta K_{t}(e_i - e_j)(e_i - e_j)^TK_{t}\\> 
>  = X^TA_{t}X + \beta X^TA_{t}X(e_i - e_j)(e_i - e_j)^TX^TA_{t}X\\> 
>  = X^TA_{t}X + \beta X^TA_{t}(x_i - x_j)(x_i - x_j)^TA_{t}X\\> 
>  = X^T(A_{t} + A_{t}(x_i - x_j)(x_i - x_j)^TA_{t})X\\> 
>  = X^TA_{t+1}X$
> 
>   如果$latex K$能收敛到$latex K^*$，那么$latex A$也能收敛到$latex A^*$。则两个问题等价，定理得证。

那么，通过这么多的推论和证明，我们终于可以认为ITML算法实际上与low-rank kernel learning的问题是一致的，因此，我们可以将ITML算法的输入由一个初始矩阵$latex A_0$置换成$latex K_0$，将限制条件更改为$latex K_{ii} + K_{jj} - 2K_{ij}$，而相应的输出也变成了一个$latex K^*$。

### 3\. ITML算法的核化Kernelize

我们在[上一篇](http://wp.me/p61l9A-68)提及ITML的思想是希望优化的$A$在满足constraints的情况下尽可能地逼近$latex A_0$，而$latex A_0$的选择就体现出了你想要求解一个怎样的问题。

假设，我希望这个度量是满足欧氏距离特性的，那么就应该选择单位矩阵$latex I$来作为初始化的$latex A_0$。由此，假设$latex A_0 = I$，则$latex K_0 = X^TA_0X = X^TX$，实际上就是一个[Gram矩阵](http://en.wikipedia.org/wiki/Gramian_matrix)。

这里我们定义一个kernel function来替代上述这种直观的表达，即

> $latex k(x,y) = \phi(x)^T\phi(y)$

其中$latex \phi()$理解为对于变量的非线性转换函数。转换到核空间后，我们是否还能通过估量来学习到一个合适的metric呢？

实际上，我们的metric 定义变成了：

> $latex d_A(\phi(x), \phi(y)) = (\phi(x) - \phi(y))^TA(\phi(x) - \phi(y))\\> 
> = \phi(x)^TA\phi(x) - 2\phi(x)^TA\phi(y) + \phi(y)^TA\phi(y)$

随后，我们定义一个新的核公式：

> $latex \widetilde{k}(x,y) = \phi(x)^TA\phi(y)$

虽然我们没有办法直接去计算$latex A$（可以理解为hilbert space下的一个operator），但是我们依然可以计算$latex \widetilde{k}(x,y)$，由于$latex A_0 = I$，我们可以考虑递归地展开学习到的matrix $latex A$：

> $latex A = I + \sum\limits_{i,j}\sigma_{ij}\phi(x_i)\phi(x_j)^T$

这是核化之后的$latex A$，它依然希望能够尽量逼近$latex I$，这里我们引入了一些系数coefficient $latex \sigma_{ij}$。这样，就可以写出新的核公式的表达形式：

> $latex \widetilde{k}(x,y) = \phi(x)^TA\phi(y) = \phi(x)^T(I + \sum\limits_{i,j}\sigma_{ij}\phi(x_i)\phi(x_j)^T)\phi(y) \\> 
> = \phi(x)^T\phi(y) + \sum\limits_{i,j}\sigma_{ij}\phi(x)^T\phi(x_i)\phi(x_j)^T\phi(y) \\> 
> = k(x,y) + \sum\limits_{i,j}\sigma_{ij}k(x,x_i)k(x_i,y)$

到这里，我们看到，新的核公式是老的核公式和一系列系数的组合，通过优化Equation.2当中的问题，我们可以得到一系列系数$latex \sigma_{ij} $来估量新的核函数$latex \widetilde{k}()$。

### 4\. 在线算法

在一般的metric learning甚至于优化问题当中，通常程序是接收一堆数据并进行最小化的工作。我们接下来介绍一下一个online算法，能够在线增量地对metric进行优化和学习。

#### 4.1\. 问题定义

在online算法里，假设算法接收一个实例 $latex (x_t, y_t, d_t)$，其中$latex t$是一个time step，并且使用当前的model $latex A_t$ 预测一个distance $latex \widetilde{d_{A_t}} = d_{A_t}(x_t,y_t)$。

那么这个prediction的loss可以表达为$latex l_t(A_t) = (d_t - \widetilde{d_t})^2 $。其中，$latex d_t$我们称之为$latex x_t$和$latex y_t$之间的"true/target" distance。

那么通过一次prediction，算法将 $latex A_t$ 修改为 $latex A_{t+1}$，并且用新的model进行接下来的预测，我们于是得到predicitons的 total loss 为 $latex \sum_tl_t(A_t)$。

对于这样一个total loss，由于输入数据和他们的target distance是没有关联的，我们找不到它的bound，一个可行的方案就是将其和离线阶段中的最佳可能（best possible）方案进行对比。

对于最佳可能方案，可以这样得到，假设给出一个T-trail sequence $latex S = \{(x_1,y_1,d_1),...,(x_T,y_T,d_T)\}$, best possible方案满足：

> $latex A^* = \arg\min\limits_{A \succeq 0} \sum\limits_{t = 1}^{T}l_t(A)$

理解起来非常简单易懂，就是对于离线给定的测试序列，total loss最小化的。

这样，对于online算法而言，就是将得到的total loss和最佳可能方案进行对比。

一个解决在线学习的通用方法是在每一个time step解决下列正规化优化问题：

> $latex \min\limits_{A \succeq 0}~~f(A) = \overbrace{D(A,A_t))}^{Regularization~Term} + ~ \eta_t\overbrace{l_t(A)}^{Loss~Term}$

这个公式中，$latex \eta_t$是$latex t$时刻的learning rate，$latex D$是用来测量新计算的matrix $latex A$和当前的$latex A_t$的散度divergence。

Regulartization Term : 最小化两者散度是为了使得两者尽量靠近而保证最小化趋于平稳。

Loss Term : 是为了使得计算的model $latex A $和特定时刻的$latex A_t $保持一致。使得学习到的distance尽量与target distance保持一致。

而learning rate则跟具体问题相关，需要进行调节。

这个问题中，我们同样用LogDet来表示散度$latex D $，于是可以得到：

> $latex A_{t+1} = \arg\min\limits_{A} ~ D_{ld}(A,A_t) + \eta_t (d_t - \widetilde{d_{t}})^2 $