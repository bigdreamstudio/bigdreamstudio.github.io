---
layout: default
title: 谱梦工作室的博客
tagline:
---
<div class="row-fluid">
<div class="well page-header">
  <h1>Blog Posts:<small>{{ page.tagline }}</small>{% endif %}</h1>
</div>

{% for post in paginator.posts %}
    <div class="well thumbnail clearfix" style="margin-bottom:12px">
	    <div class="caption">
		   {% if post.thumbnail %}
               <img src="{{ post.thumbnail }}" alt="" style="float:right;height:expression(this.height > 350 ? '350px': true);max-height:350px;width:expression(this.width > 400 ? '400px': true);max-width:400px;">
           {% endif %}
           <h3><a href="{{ post.url }}">{{ post.title }}</a> <small> Written by <a href="/about.md">bigdreamstudio</a> on {{ post.date | date:"%Y-%m-%d" }} in {{ post.categories | category_links }} <script language="javascript" src="http://dreambt.sinaapp.com/counter.php?action=get&key={{ page.url }}">document.write(this);</script> views</small></h3>
		   <p>{% if post.excerpt %}
                {{ post.excerpt | markdownify }}
           {% endif %}</p>
           <p><a href="{{ post.url }}/#more" class="btn btn-primary">阅读全文</a></p>
        </div>
    </div>
{% endfor %}
	
<!-- Pagination links -->
<div id="pagination" class="pagination">
	<ul>
		<li><a href="/">首页</a></li>
		{% if paginator.page > 1 %}
			<li><a href="/page{{paginator.previous_page}}/">上一页</a></li>
		{% endif %}
		{% assign startPage = paginator.page | minus:5 %}
		{% if 2 > startPage %}				
		{%	 assign startPage = 1 %}
		{% endif %}
		{% assign endPage = startPage | plus:10 %}
		{% if endPage >= paginator.total_pages %}				
		{%	 assign endPage = paginator.total_pages | minus:1 %}
		{% endif %}
		{% for count in (startPage..endPage) %}
			{% if count == paginator.page %}
			<li><a href="#"><span class="current-page">{{count}}</span></a></li>
			{% else %}
			<li><a href="/page{{count}}/">{{count}}</a></li>
			{% endif %}
		{% endfor %}
		{% if paginator.next_page %}
			<li><a href="/page{{paginator.next_page}}/">下一页</a></li>
		{% endif %}
		<li><a href="/page{{paginator.total_pages}}/">末页</a></li>
		<li><a href="#">第{{paginator.page}}页 / 共{{paginator.total_pages}}页</a></li>
	</ul>
</div>
</div>
<a id="scroll_to_top" href="#" class="v_nav"></a>
{% if paginator.page > 2 %}
  <a id="prev" href="/page{{paginator.previous_page}}/" class="v_nav" style="display: block"><span class="icon">Prev</span></a>	
{% endif %}
{% if paginator.next_page %}
  <a id="next" href="/page{{paginator.next_page}}/" class="v_nav" style="display: block"><span class="icon">Next</span></a>		
{% endif %}