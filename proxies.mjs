import buildMenuItem from './buildMenuItem.mjs';
import SysTray from './index.js'
import settings from './proxiesConfiguration.json' with {type: 'json'}

const allProxyItemsBuilders = Object.entries(settings.configs).map(buildMenuItem);

const buildProxiesMenuItems = ({deps, exitButton}) => [
  ...allProxyItemsBuilders.map(proxy => proxy(deps)),
  SysTray.default.separator,
  exitButton
]

export default buildProxiesMenuItems;
