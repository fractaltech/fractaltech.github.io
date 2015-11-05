app('dom.timelines.All', () => {
  class All extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="row">
          <div className="col-md-12">
            <h2>All Timelines</h2>
          </div>
        </div>
      );
    }
  }

  return All;
});