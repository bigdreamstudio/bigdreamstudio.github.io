/*
 * jQuery autoTOC plugin
 *
 * http://sites.google.com/site/solidthingssite
 * Copyright (c) 2009-2010 Peter Binney
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
;
(function($) {
	$.fn.autoTOC = function(options)
	{
		var version = '1.3 (24-Mar-2011)'
		var options = jQuery.extend({
			selector: "h2,h3,h4,h5,h6",	// jQuery selector string to identify TOC items

			autoIndent: true,				// Whether to indent TOC items for elements that are (appear to be)
											// further down the "selector" list.
											// Assumes "selector" is ordered comma-separated list of tag names.
											// eg: with default ("h1,h2,h3,h4,h5,h6"), indents everything after H1
											// But, indent only happens if higher level selectors exist on the page.
											// ie: if doc only contains H6's, there's no indenting
			indentLevels: null,				// TBD

			cols: 4,						// Preferred number of columns in TOC (assuming enough items). Could be
											// more than this if too many orphans.

			colSuffixSections: null,		// Allows for adding arbitrary HTML to each column in the ToC.
											// If non-null, is an array of HTML to add to column(s) in the ToC.
											// The array is reverse-indexed from the last column.
											// ie: item[0] is appended to the last columen,
											//     item[1] to the penultimate one, etc.

			avoidOrphans: true,				// TRUE if selector is a precedence-ordered, comma-separated, list of tagnames
											// and child elements are not to be orphaned by a column break in the TOC.
											// Thus, with the default selector, an h2-generated item that is due to
											// fall at the end of a column will be pushed to the top of the next column if
											// it precedes an h3-generated one (that would otherwise be top of the next column).

			LIclassPrefix: null,			// If non-null, each LI in the TOC is given a CSS class of this name plus the
											// tagName of the element it was generated from as: prefix-tagName
											// eg: if prefix set to "TOC", an entry from an H2 would have class="TOC-H2"

			addInfo: false,
			debug: false
		}, options);

		var items = $(options.selector)
		var rowsPerCol = parseInt((items.length + options.cols - 1) / options.cols)
		var cols = 0 	// Set in main function
		if (false)
			alert ("items=" + items.length + " cols=" + cols + " rowsPerCol=" + rowsPerCol)
		var tagName	// Set/updated by isColBreak()
		var indentSelectors = new Array()	// Non-empty if autoIndent-ing
		if (options.autoIndent)
		{
			options.indentLevels = new Array()	// Index: tagName (UPPER case)  Value: Indent level (0 is none)
			indentSelectors = options.selector.replace(/ /g, "").toUpperCase().split(",")
			for (var i=0; i < indentSelectors.length; i++)
				options.indentLevels[indentSelectors[i]] = i
		}
		
		return this.each(function()
		{
			var autoAnchorsAdded = 0
			var autoAnchorBase = ""
			var autoAnchorBaseSearches = 0
			var autoAnchorFailures = 0
			var TOChtml = ""
			var colEnd = ""
			var col = 0
			var rowsThisCol = 0
			var indentLevel = 0
			var minIndentLevel = -1	// 0+ value used
			var indentLevels = new Array()	// Working copy of options.indentLevels, with tags restricted to those
											// found in the document and levels normalised to 0, 1, ... etc
			// Run through items to count columns and work out what selectors we have
			for (var i=0; i < items.length; i++)
			{
				if (isColBreak(i, rowsThisCol))
				{
					cols++
					rowsThisCol = 0
				}
				rowsThisCol++	// Needed for addToLastCol processing
				if (indentSelectors.length > 0 && options.indentLevels[tagName])
					indentLevels[tagName] = -1	// Note all tagNames with -1 indent value for now
			}
			for (var i=0, j=0; i < indentSelectors.length; i++)
			{	// Allocate indent levels to selectors in this document
				var selector = indentSelectors[i]
				if (indentLevels[selector] == -1)
					indentLevels[selector] = j++
			}

			rowsThisCol = 0
			var indentLevel = 0		// Current (if any) indent level.
			for (var i=0; i < items.length; i++)
			{
				var item = $(items.get(i))
				var A = $(item).find("a[name]")
				var anchor = "notKnown!"
				if (A.length > 0)
					anchor = $(A[0]).attr("name")
				else
				{
					if (autoAnchorBase == "")
					{
						autoAnchorBaseSearches++
						autoAnchorBase = getAutoAnchorBase()
						if (autoAnchorBase == "")
							autoAnchorFailures++
					}
					if (autoAnchorBase != "")
					{
						anchor = autoAnchorBase + "-" + (++autoAnchorsAdded)
						$(item).wrapInner("<a name='" + anchor + "'></a>")
					}
				}
				var CSSclass = ""
				if (options.LIclassPrefix &&
				    $.trim(options.LIclassPrefix) != "" &&
				    tagName != "" )
					CSSclass = " class='" + options.LIclassPrefix + "-" + tagName + "'"

				// if this tag indent level higher than current
				//     slip in UL and note
				// elseif indenting and this tag lower than current
				//     remove indent

				TOChtml += "<li" + CSSclass + "><a href='#" + anchor + "'>"
				         + item.text()
				         + "</a></li>\n"
				rowsThisCol++
			}
			var info = ""
			if (options.addInfo || autoAnchorFailures > 0)
				info = " title='Generated by autoTOC version " + version
				     + "\n items=" + items.length
				     + "\n autoAnchorsAdded=" + autoAnchorsAdded 
				     + (autoAnchorFailures > 0 ? "\n autoAnchorFailures=" + autoAnchorFailures : "")
				     + "'"
			$("<li class='nav-header'>Contents</li>"+TOChtml+"").prependTo($("#sidebar"))
		});

		function isColBreak(i, rowsThisCol)
		{
			tagName = items[i].tagName ? $.trim(items[i].tagName).toUpperCase() : ""
			var colBreak = rowsThisCol % rowsPerCol == 0
			if (!colBreak && ((i+1) < items.length) && options.avoidOrphans)
			{	// On last row of column. Check if we need to push this item to top of next one to prevent orphaning child.
				var nextTagName = items[i+1].tagName ? $.trim(items[i+1].tagName).toUpperCase() : ""
				var tags = options.selector.toUpperCase().split(',')
				for (var j=0; !colBreak && j < tags.length-1; j++)
				{
					var tag = $.trim(tags[j])
					var nextTag = $.trim(tags[j+1])
					if (tag == tagName && nextTag == nextTagName)
						colBreak = true
				}
			}
			return colBreak
		};

		function getAutoAnchorBase()
		{
			var bases = ["autoTOC", "AutoTOC", "_autoTOC"]
			for (var i in bases)
			{
				for (var n=0; n < 1000; n *= 10)
				{
					var N = "" + n
					if (n == 0)
					{
						n = 1
						N = ""
					}
					if ($("a[name^=" + bases[i] + N + "]").length < 1)
						return bases[i] + N
				}
			}
			return ""
		};

		function colSuffix(col)
		{
			if (col > 0 &&
			    options.colSuffixSections &&
			    options.colSuffixSections.length > 0)
			{
				var suffixIndex = cols - col
				if (suffixIndex >= 0 &&
					suffixIndex < options.colSuffixSections.length &&
			        options.colSuffixSections[suffixIndex])
				{
					return "\n" + options.colSuffixSections[suffixIndex] + "\n"
				}
			}
			return ""
		};
	};
})(jQuery);