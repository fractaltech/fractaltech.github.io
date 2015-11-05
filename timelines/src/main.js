app('main', () => {
  app('data.describeProjects')();

  const Container = app('dom.Container');

  return () => {
    ReactDOM.render(<Container />, document.querySelector('main'));
  };
});

document.addEventListener('DOMContentLoaded', ev => {
  app();
});