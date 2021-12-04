import { toExcel } from '.';

/**
 * Build wrapper to create valid browser script.
 * This will inject toExcel to the window object to be available globally within the web page
 */
class WebContainer extends toExcel {}

(global as any).toExcel = WebContainer;
