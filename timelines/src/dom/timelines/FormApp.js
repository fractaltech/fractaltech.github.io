app('dom.timelines.FormApp', () => {
  const team = app('data.team');
  const range = app('util.range');

  class FormApp extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Resource</th>
                  {(() => {
                    return range(1,19).map((i) => {
                      return (
                        <th><small>Month {i}</small></th>
                      );
                    })
                  })()}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{team.founder('kapil').name}</td>
                </tr>

                <tr>
                  <td>{team.founder('vivek').name}</td>
                </tr>

                <tr>
                  <td>{team.developer(1).name}</td>
                </tr>

                <tr>
                  <td>{team.developer(2).name}</td>
                </tr>

                <tr>
                  <td>{team.designer(1).name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  return FormApp;
});