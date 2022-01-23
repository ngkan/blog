---
layout: article
title: "Airport Construction - 2017 ICPC World Finals"
key: 2021-08-14-bun-rieu-cua-pho-bom
tag: 
- Competitive Programming
- ICPC
- Geometry
---

In this problem, we are given a polygon of $\leq 200$ vertices and the goal is
to find the length of the longest segment that fits inside the polygon.

![Sample example]({{ site.baseurl }}/assets/img/airport-construction-wf.png){:.border.rounded}

### The intuition

First, unless something is horribly wrong, both of the endpoints of the segment
must lie on the polygon edges.
By method of thinking, we can see that it would be more optimal when at least
one vertex of the polygon lies on the segment.
The writer don't want to deprive the reader of the joy of discovering for
themselves why it is even more optimal if there are at least two vertices lie on
that segment.

So one of the correct algorithm can go like this: iterate pairs of polygon
vertices; the answer will be one of the segment created by some pair of vertices.

This approach is not quite difficult to come up with, but to implement it is
another different story: since the polygon is not necessarily convex, we need to
come up with a smart implementation to avoid dealing with corner cases.

### From ideas to code

We can sum up the corner cases in this one image:

(an image)

We will divide the vertices of the polygon into three categories:

- Lying above line AB
- Lying on line AB
- Lying below line AB

The observation here is that if we do a walk on polygon edges, then there will
be at most two points lying on AB.

If we sort those pairs of two points on line AB, we observe see that a possible
answer can be the segment create of consecutive pairs of two points.

(to be continue)
