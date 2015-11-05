app('dom.timelines.AppBuilderPlatform', () => {
  class AppBuilderPlatform extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="row">
          <div className="col-md-12">
            <h2>App Builder Platform Timelines</h2>
          </div>
        </div>
      );
    }
  }

  return AppBuilderPlatform;
});