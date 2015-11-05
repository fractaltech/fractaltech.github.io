app('dom.timelines.AppBuilderPaaS', () => {
  class AppBuilderPaaS extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="row">
          <div className="col-md-12">
            <h2>App Builder PaaS Timelines</h2>
          </div>
        </div>
      );
    }
  }

  return AppBuilderPaaS;
});