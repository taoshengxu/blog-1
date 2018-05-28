---
layout: post
title: AR + V-SLAM的学习资料汇总
categories:
  - "科研笔记"
tags:
  - "Augmented Reality"
  - "卡尔曼滤波"
  - "定位技术"
  - "SLAM"
  - "SfM"
draft: false
id: 638
date: 2015-10-13 09:21:59
toc_number_disable: true
cover_img: /blog/post_cover_images/firenze.png
cover_img_from_root: true
permalink:
description:
comments:
---

## 1. 一开始

说到AR，现在往往要说起来SLAM (Simultaneous Localization and Mapping)，这两者之间是什么关系呢，可能会困扰很多的初学者。且先看点定义~

> Augmented reality (AR) is a technique that allows to seamlessly composite virtual objects or information into real scene.
>
>   Simultaneous localization and mapping (SLAM) is a key fundamental technique for augmented reality, which provides the ability of self-localization in an unknown environment and mapping the 3D environment simultaneously. The localization and mapping enables fusion of virtual objects and real scenes in a geometrically consistent way.

*注意现在在AR当中多使用的是Visual SLAM，即V-SLAM的技术。*

两段简短的话，直接从文献[^12]里抽出来的，实话来讲，AR里头可以借助多种多样的技术，例如

* 采用marker (QR code / 激光栅格)，通过识别marker在图像中的位置来恢复相机三维运动，缺点是场景扩展差，要求marker始终在图像之中；
* 采用IMU (Inertial Measurement Unit)结合定位技术（如GPS和wireless技术），由于通常局部精度不够，会出现虚拟物体跳跃和偏移现象，且高精度的仪器目前还比较昂贵；
* 采用场景布置方式，在场景中布置无线信号发射，通过信号交换的方式进行自身位置的确定，多使用在机器人领域中，不适合移动端进行AR

那么以上这些方法，要么受到精度和效率的影响，要么受到花费代价的影响，存在着一些局限。而SLAM，无需事先部署场景或昂贵设备，是一种markerless的方式，且能够扩展场景保证局部的定位精度，使得虚拟物体能够和现实场景进行很好的吻合，目前而言，是AR技术中最为合适的底层解决方案。

因此，目前而言，学习AR的算法基础，还是从SLAM和SFM (Structure From Motion)开始吧。

## 2. 书籍和教程

* Multiple View Geometry in Computer Vision (Second Edition). [http://www.robots.ox.ac.uk/~vgg/hzbook/](http://www.robots.ox.ac.uk/~vgg/hzbook/) 这本书就是SLAM的bible了~

* [Robotics Vision and Control](http://www.petercorke.com/RVC/). 机器视觉领域的大牛，昆士兰理工的Peter Corke写的教材

* [Computer Version: Algorithms and Applications](http://szeliski.org/Book/). 不多说，一本CV的基础书籍，帮助理解图像和计算机视觉中的一些基础理论知识

* [Probabilistic Robotics](http://probabilistic-robotics.org/). 没有看过，在机器视觉里是本经典教材.

* [Visual 3D Modeling from Images](www.cs.unc.edu/~marc/tutorial.pdf)

* [SLAM for dummies](https://ocw.mit.edu/courses/aeronautics-and-astronautics/16-412j-cognitive-robotics-spring-2005/projects/1aslam_blas_repo.pdf)， A Tutorial Approach to Simultaneous Localization and Mapping，主要还是讲EKF的东西.

## 3. 经典论文和框架系统

### 3.1 介绍SLAM算法框架的一些文献

* MonoSLAM. 基于滤波器的V-SLAM 主要的参考为文献[^1]，是一个基于单目摄像头的SLAM系统，MonoSLAM中每个时刻的系统状态是由当前的运动参数 $ C_t $ 和所有的三维点 $ \mathbf{X_1}, \ldots, \mathbf{X_n} $ 构成的，而当前状态的概率偏差由滤波器来控制和进行更新，选用的是扩展卡尔曼滤波器（Extended Kalman Filter，EKF），预测阶段(prediction)利用 $ C_{t-1} $ 和线性、旋转加速度和时间差对 $ C_t $进行确认，随后在更新阶段(update)则将观测到的图像点投影到三维场景中，得到新的三维点位置。注意每一时刻参与计算的系统状态只有 $ C_t $ 和所有的三维点 $ \mathbf{X_1}, \ldots, \mathbf{X_n} $ ，而不考虑 $ C_1, \ldots, C_{t-1} $ 的影响。

* MSCKF. 是一个基于IMU的滤波器V-SLAM，参考文献为[^2]。和MonoSLAM一样，诞生于2007年，基于滤波器对系统状态进行预测更新，不同在于：预测阶段，IMU数据被用来传递系统状态；更新阶段，MSCKF是利用一个窗口大小，将临近的多帧的运动参数都加入到一个状态变量集合中。这个集合中的运动参数在不断更新的过程中不断被优化，可以用来缓解误差的累积。

* PTAM. 是基于关键帧进行Bundle Adjustment的V-SLAM，07年进行了开源，其文献可见[^3] [^4] [^5] [^6]。PTAM对于SLAM技术的发展做出的贡献源于其提出的分离tracking和mapping过程提高计算效率实现实时SLAM。在mapping的线程中仅仅维护一些稀疏关键帧(key frame)和关键帧中的可见三维点，用来进行BA (Bundle Adjustment)；在tracking的线程中可以利用后台BA出的三维结构，仅仅需要优化当前帧的运动参数即可。多说一下重定位 (re-localizing)[^6]的事情，即当当前帧的成功匹配点不足时，认为跟踪失败，进行重定位，需要将当前帧和已有关键帧进行比较，选择最相似的关键帧作为当前帧方位的预测；如果跟踪成功，就计算当前的运动参数是否符合关键帧的条件，若符合则传递给后台构建地图。

* ORB-SLAM. 无疑的PTAM之后基于关键帧进行BA的明星算法了，2016年又有了ORB-SLAM2，其参考文献为[^7] [^8]。基本上延续了PTAM的算法框架，但是其在工程方面的扩展和优化使得其成为当前最稳定可靠的单目SLAM框架。一是其选用ORB特征并基于ORB做特征匹配和重定位，在视角不变性上有一定的优势；二是加入了回路检测和闭合机制，用来消除误差累积，最后使用了方位图pose graph来完成优化实现闭合回路；三是相比PTAM对于关键帧的选择更为宽松，尽可能及时加入关键帧做BA，保证鲁棒跟踪，但是也可以删除冗余的关键帧保证BA的效率。

* DTAM. 是一个基于直接跟踪法 (Direct Tracking) 的SLAM系统[^9]，直接跟踪即不依赖于特征点的特区和匹配，而是直接通过比较像素颜色来求解相机的运动参数。DTAM是2011年提出的，特点在于能够实时恢复三维场景模型，能够保证在特征缺失、图像质量模糊的情况下依然可以稳定地直接跟踪。为了恢复三维场景，DTAM的后台程序需维护参考帧的深度图信息，其选用了逆深度方式来表达深度。

* LSD-SLAM. 也是一个直接跟踪的SLAM系统[^10]。其主要相比DTAM采用了半稠密的深度图，且每个像素的深度独立计算，计算效率更高。LSD也采用关键帧表达场景，每个关键帧不仅有其图像，还有逆深度图和逆深度的方差信息。而前台采用直接跟踪的方式，恢复当前帧和关键帧的相对运动关系。后台程序通过对关键帧信息采用EKF进行更新得到优化的场景信息。同时，LSD和ORB的类似之处，在于使用了方位图pose graph的优化来取代全局优化，因此具备闭合循环回路和扩展大场景的能力。

* SVO. 查看文献[^15]，基于半稠密法的直接跟踪框架。特征跟踪采用SVO方法，对场景的要求不是特别敏感，而且效率较高，目前SVO的SLAM部分依然很难用，原因在于选择关键帧做优化，特别是地图构建方面做得还不够优。用在三维场景构建中的鲁棒性很强。

> 基本上SLAM可以分为前端的tracking和后端的mapping两大块。
> * 在tracking方面，基本上现在都采用的是图像和RGBD这两种，图像的配准分为基于稀疏(sparse)特征和稠密(dense)两种。例如MonoSLAM、MSCKF、PTAM、ORB-SLAM这些都是基于提取的特征，如FAST\ORB等等，的方法；而DTAM、LSD、SVO都是基于稠密或者半稠密进行直接跟踪的方法。
> * 在后端的mapping方面，主要是将前端tracking中计算的累积误差的校正的基础上构建关键三维场景，主流有基于概率学的贝叶斯滤波器EKF\PF做优化的，还有基于稀疏的图进行优化的方法。例如MonoSLAM、MSCKF都是基于滤波进行的，PTAM和DTAM都考虑在关键帧的基础上进行BA，而LSD-SLAM和ORB-SLAM都是基于方位图进行全局优化的。

### 3.2 介绍SLAM基础或关键技术的一些文献

* Graph-based SLAM，图优化方法. Davison在文献[^13]中介绍了图优化方法Graph-based SLAM来取代传统的EKF方法的SLAM. 相关的g2o可以查看文献[^11].

* 光束平差 (Bundle Adjustment)，请看文献[^14]，权威的BA文献.

* 回路闭合 (loop closure)，参照文献[^16]，回路闭合检测机制可以有效的减轻在tracking过程中的误差累积导致的飘移.

## 4. 在线课程和文档

* Andrew Davison. [http://www.doc.ic.ac.uk/~ajd/Robotics/index.html](http://www.doc.ic.ac.uk/~ajd/Robotics/index.html). 这里还同时包含了大牛Durrant-Whyte和Tim Bailey写的[tutorial-1](http://www.doc.ic.ac.uk/~ajd/Robotics/RoboticsResources/SLAMTutorial1.pdf) 和 [tutorial-2](http://www.doc.ic.ac.uk/~ajd/Robotics/RoboticsResources/SLAMTutorial2.pdf).

* OpenCV的文档， [Camera Calibration and 3D Reconstruction](http://docs.opencv.org/2.4/modules/calib3d/doc/camera_calibration_and_3d_reconstruction.html) 中，包含SLAM相关的基础理论公式以及C/C++/Python实现的API。

* 摄像头标定的教程，[MSR的张正友的主页](http://research.microsoft.com/en-us/um/people/zhang/).

* 国内的SLAM团体，泡泡机器人发布的公开课资料. [干货](http://qoofan.com/u/MzI5MTM1MTQwMw==.html).

## 5. 网站

* OpenSLAM： [https://openslam.org/](https://openslam.org/) ，其中包含的g2o[^11]是目前最流行的graph optimization的实现工具.

* ROSROS [http://www.ros.org/](http://www.ros.org/) 机器视觉框架工具，跨平台，包含一整套常用的机器人理论的算法和工具的实现.

* M家的 [Kinect](http://kastner.ucsd.edu/ryan/wp-content/uploads/sites/5/2014/03/admin/3D-reconstruction-kinect.pdf) 可看做一个RGBD Camera.

* G家的 ATAP（先进技术与计划）部门开发的 [Project Tango](https://www.google.com/atap/project-tango/).

## 6. 一些有用的博客地址

* [http://blog.csdn.net/akunainiannian](http://blog.csdn.net/akunainiannian). 一位做机器视觉的学生的博客.

* [http://blog.csdn.net/qinruiyan/](http://blog.csdn.net/qinruiyan/). SLAM学习笔记系列博客，讲清楚了各种估计准则在SLAM中的数学意义.

* [https://www.zhihu.com/question/35186064](https://www.zhihu.com/question/35186064). 知乎上一个问题讨论.

* [http://www.cnblogs.com/gaoxiang12/](http://www.cnblogs.com/gaoxiang12/) THU的gaoxiang的博客.

## 7. 数据集

* [The Málaga Stereo and Laser Urban Data Set](http://www.mrpt.org/MalagaUrbanDataset)，覆盖了城市中汽车驾驶的各种情况，里面提供了双摄像头，Laser，IMU等数据以及GPS的ground truth trajectory.

* [Kitti Dataset](http://www.cvlibs.net/datasets/kitti/)，汽车驾驶数据集，包括单目视觉 双目视觉等.

* [TU Munich Dataset](https://vision.in.tum.de/data/datasets/rgbd-dataset)，里面提供了大量的室内的RGBD数据集，以及非常方便好用的benchmark tools.

* [Open SLAM Dataset](https://www.openslam.org/links.html)

* [CMU Visual Localization Data Set](http://3dvis.ri.cmu.edu/data-sets/localization/): Dataset collected using the Navlab 11 equipped with IMU, GPS, Lidars and cameras.

* [The Rawseeds Project](http://www.rawseeds.org/): Indoor and outdoor datasets with GPS, odometry, stereo, omnicam and laser measurements for visual, laser-based, omnidirectional, sonar and multi-sensor SLAM evaluation.

* [New College Dataset](http://www.robots.ox.ac.uk/NewCollegeData/): 30 GB of data for 6 D.O.F. navigation and mapping (metric or topological) using vision and/or laser.

* [NYU RGB-D Dataset](http://cs.nyu.edu/~silberman/datasets/): Indoor dataset captured with a Microsoft Kinect that provides semantic labels.

* [Victoria Park Sequence](http://www-personal.acfr.usyd.edu.au/nebot/victoria_park.htm): Widely used sequence for evaluating laser-based SLAM. Trees serve as landmarks, detection code is included.

* [Ford Campus Vision and Lidar Dataset](http://robots.engin.umich.edu/SoftwareData/Ford): Dataset collected by a Ford F-250 pickup, equipped with IMU, Velodyne and Ladybug.

## 引用

[^1]: Andrew J. Davison, Ian D. Reid, Nicholas Molton, Olivier Stasse. MonoSLAM: Real-Time Single Camera SLAM. IEEE Trans. Pattern Anal. Mach. Intell. 29(6): 1052-1067 (2007).

[^2]: Anastasios I. Mourikis, Stergios I. Roumeliotis. A Multi-State Constraint Kalman Filter for Vision-aided Inertial Navigation. ICRA 2007: 3565-3572.

[^3]: Georg Klein, David W. Murray. Parallel Tracking and Mapping for Small AR Workspaces. ISMAR 2007: 225-234.

[^4]: Georg Klein, David W. Murray. Parallel Tracking and Mapping on a camera phone. ISMAR 2009: 83-86.

[^5]: Robert Oliver Castle, David W. Murray. Keyframe-based recognition and localization during video-rate parallel tracking and mapping. Image Vision Comput. 29(8): 524-532 (2011).

[^6]: Georg Klein, David W. Murray. Improving the Agility of Keyframe-Based SLAM. ECCV (2) 2008: 802-815.

[^7]: Raul Mur-Artal, J. M. M. Montiel, Juan D. Tardós. ORB-SLAM: A Versatile and Accurate Monocular SLAM System. IEEE Trans. Robotics 31(5): 1147-1163 (2015).

[^8]: Raul Mur-Artal, Juan D. Tardós. ORB-SLAM2: an Open-Source SLAM System for Monocular, Stereo and RGB-D Cameras. CoRR abs/1610.06475 (2016).

[^9]: Richard A. Newcombe, Steven Lovegrove, Andrew J. Davison. DTAM: Dense tracking and mapping in real-time. ICCV 2011: 2320-2327.

[^10]: Jakob Engel, Thomas Schöps, Daniel Cremers. LSD-SLAM: Large-Scale Direct Monocular SLAM. ECCV (2) 2014: 834-849.

[^11]: Rainer Kümmerle, Giorgio Grisetti, Hauke Strasdat, Kurt Konolige, Wolfram Burgard. G2o: A general framework for graph optimization. ICRA 2011: 3607-3613.

[^12]: 基于单目视觉的同时定位与地图构建方法综述. 《计算机辅助设计与图形学学报》, 2016, 28(6):855-868.

[^13]: Hauke Strasdat, J. M. M. Montiel, Andrew J. Davison. Visual SLAM: Why filter? Image Vision Comput. 30(2): 65-77 (2012).

[^14]: Bill Triggs, Philip F. McLauchlan, Richard I. Hartley, Andrew W. Fitzgibbon. Bundle Adjustment - A Modern Synthesis. Workshop on Vision Algorithms 1999: 298-372.

[^15]: Christian Forster, Matia Pizzoli, Davide Scaramuzza. SVO: Fast semi-direct monocular visual odometry. ICRA 2014: 15-22.

[^16]: Raul Mur-Artal, Juan D. Tardós. Fast relocalisation and loop closing in keyframe-based SLAM. ICRA 2014: 846-853.
