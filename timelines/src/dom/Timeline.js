app('dom.Timeline', () => {

  const {projects, resources} = app('data.store');
  const months = app('util.months');


  class Timeline extends React.Component {
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
                </tr>
              </thead>

              <tbody>
                {(() => {
                  return Array.from(resources).map((resource) => {
                    return [
                      <tr>
                        <th className="bg-warning"><small>{resource.name}</small></th>
                        {(() => {
                          return months(1,18).map((m) => {
                            return <td className="bg-warning"><small><small>Month {m}</small></small></td>;
                          });
                        })()}
                      </tr>
                    ].concat(Array.from(resource.projects).map((project) => {
                      return resource.responsibilitiesFor(project).map((responsibility) => {
                        return (
                          <tr>
                            <td><small><small>
                              <strong>{project.name}: </strong>{responsibility.involvement}
                            </small></small></td>

                            {(() => {
                              return months(1,18).map((m) => {
                                if (responsibility.coversMonth(m)) {
                                  return (<td style={responsibility.bgStyle()}></td>);
                                } else {
                                  return (<td></td>)
                                }
                              })
                            })()}
                          </tr>
                        );
                      });
                    }).reduce((nodes, childNodes) => {
                      return nodes.concat(childNodes);
                    }, []))
                  });
                })()}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  return Timeline;
});