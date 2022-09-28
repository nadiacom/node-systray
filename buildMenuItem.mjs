const buildMenuItem = ({cluster, instance, port}) =>
  ({ sendAction, startProxy, runningProxies }) => {
    const proxy = {
      title: instance,
      tooltip: `${instance} sur ${cluster}`,
      checked: false,
      enabled: true,
      click: () => {
        const instanceName = instance;
        const portNumber = port;
        if (!proxy.checked) {
          console.log(`Starting proxy for ${instanceName} at ${portNumber} ...`);
          runningProxies.push(startProxy(instanceName, portNumber));
        }
        else {
          console.log(`... Stopping proxy for ${instanceName} at ${portNumber}`);
          console.log(
            runningProxies
            .map(({instance}) => `${instance}`)
            .join(', '))
          runningProxies
            .filter(({instance}) => instance === instanceName)
            .forEach(({process}) => process.kill());
          runningProxies = runningProxies.filter(({process}) => !process.killed);
        }
        proxy.checked = !proxy.checked
        sendAction(proxy, instanceName, `${instance} sur ${cluster}]`);
      }
    };
    return proxy;
  }

export default buildMenuItem;
