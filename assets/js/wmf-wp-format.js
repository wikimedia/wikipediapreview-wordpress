// @todo code from wpwpp, update for this project

// start with the modification of "Link" format
// https://github.com/WordPress/gutenberg/blob/trunk/packages/format-library/src/link/index.js
( function( wp ) {
	var h = wp.element.createElement;
	var formatType = 'wmf/wp-format';
	var formatTitle = 'Wikipedia Preview';

	var WmfWpButton = function({ isActive, onClick }) {
		return h(
			wp.blockEditor.RichTextToolbarButton,
			{
				icon: 'editor-code',
				title: formatTitle + (isActive ? ' (ON)' : ' (OFF)'),
				isActive: isActive,
				onClick: onClick
			}
		);
	}

	var WmfWpPopover = function({ anchorRef, focusOnMount, onClose }) {
		return h(
			wp.components.Popover,
			{
				anchorRef, //={ anchorRef }
				focusOnMount, //={ focusOnMount.current }
				onClose, //={ stopAddingLink }
				position: 'bottom center'
			},
			h(
				'form',
				{
					style: {width: 250}
				},
				h(wp.components.TextControl, {label: 'lang', value: 'en'}),
				h(wp.components.TextControl, {label: 'title', value: 'cat'})
			)
		);
	}

	var Edit = function({ isActive, contentRef, value, onChange }) {
		var [ isEditingWP, setEditingWP ] = wp.element.useState(false);
		var anchorRef = wp.richText.useAnchorRef( { ref: contentRef, value, settings } );
		var startEditingWP = function() {
			setEditingWP(true);
		};
		var toggleWP = function() {
			var text = value.text.substr(value.start, value.end-value.start)
			onChange( wp.richText.toggleFormat(
				value,
				{
					type: formatType,
					attributes: {
						'data-wikipedia-preview': '',
						'data-wp-title': text,
						'data-wp-lang': 'fr'
					}
				}
			) );
		};
		var popover = null
		if (isEditingWP || isActive) {
			popover = WmfWpPopover({ anchorRef })
		}
		return h(
			wp.element.Fragment,
			null,
			WmfWpButton({isActive, onClick: toggleWP})
			// popover
		);
	}

	var settings = {
		title: formatTitle,
		tagName: 'span',
		className: 'wmf-wp-with-preview',
		edit: Edit
	};

	wp.richText.registerFormatType(formatType, settings);

	return;
} )( window.wp );
