app('dom.Project', () => {

  const months = app('util.months');

  class Project extends React.Component {
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
                  <th><small>Resource/Role</small></th>
                  {(() => {
                    return months(1,18).map((i) => {
                      return <th><small>Month {i}</small></th>;
                    });
                  })()}
                </tr>
              </thead>

              <tbody>
                {(() => {
                  return Array.from(this.props.project.resources).map((resource) => {
                    const responsibilities = resource.responsibilitiesFor(this.props.project);

                    return [
                      <tr>
                        <th className="bg-warning"><small>{resource.name}</small></th>
                        {(() => {
                          return months(1,18).map((m) => {
                            return <td className="bg-warning"></td>;
                          });
                        })()}
                      </tr>
                    ].concat(responsibilities.map((responsibility) => {
                      return (
                        <tr>
                          <td><small><small>{responsibility.involvement}</small></small></td>
                          {(() => {
                            return months(1,18).map((m) => {
                              if (responsibility.coversMonth(m)) {
                                return (<td style={responsibility.bgStyle()}></td>);
                              } else {
                                return (<td></td>);
                              }
                            });
                          })()}
                        </tr>
                      );
                    }));
                  });
                })()}

              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  return Project;
});