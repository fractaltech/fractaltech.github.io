app('dom.ProjectsTimeline', () => {

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
                  return Array.from(projects).map((project) => {
                    return [
                      <tr>
                        <th className="bg-warning"><small>{project.name}</small></th>
                        {(() => {
                          return months(1,18).map((m) => {
                            return <td className="bg-warning"><small><small>Month {m}</small></small></td>;
                          });
                        })()}
                      </tr>
                    ].concat(Array.from(project.resources).map((resource) => {
                      const responsibilities = resource.responsibilitiesFor(project);

                      return (
                        <tr>
                          <td><small><small>{resource.name}</small></small></td>
                          {
                            months(1,18).map((m) => {
                              const involvements = responsibilities.filter((r) => {
                                  return r.coversMonth(m);
                                }).map((r) => { return r.involvement; });

                              const className = involvements.length > 0 ? 'bg-success' : '';

                              return (
                                <td className={className}><small><small>
                                  <span style={{display: 'inline-block'}}>
                                    {involvements.join(',')}
                                  </span>
                                </small></small></td>
                              );
                            })
                          }
                        </tr>
                      );
                    }))
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