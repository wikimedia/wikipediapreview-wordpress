import { registerFormatType } from '@wordpress/rich-text';
import { name, settings } from './edit';
import { customFormatEnabled } from './utils';
import './style.scss';

if ( customFormatEnabled() ) {
	registerFormatType( name, settings );
}
