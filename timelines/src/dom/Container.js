app('dom.Container', () => {

  const {projects,project} = app('data.store');
  const Project = app('dom.Project');
  const ResourcesTimeline = app('dom.ResourcesTimeline');
  const ProjectsTimeline = app('dom.ProjectsTimeline');

  class Container extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      
      this._initTabs();
    }

    _initTabs() {
      this.state.tabs = [
        {slug: 'all-resources', name: 'All Resources Timelines'},
        {slug: 'all-projects', name: 'All Projects Timelines'}
      ].concat(Array.from(projects).map((p) => { return {slug: p.slug, name: p.name}; }));

      this.state.activeTab = this.state.tabs[0];
    }

    activateTab(tab) {
      this.setState({activeTab: tab});
    }

    onTabActivated(tab, ev) {
      ev.preventDefault();
      this.activateTab(tab);
    }

    render() {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1>Actions and Timelines</h1>

              <ul className="nav nav-tabs">
                {(() => {
                  return this.state.tabs.map((tab) => {
                    return (
                      <li className={tab === this.state.activeTab ? 'active' : ''}>
                        <a href="#" onClick={this.onTabActivated.bind(this, tab)}>
                          {tab.name}
                        </a>
                      </li>
                    );
                  });
                })()}
              </ul>

              {(() => {
                switch (this.state.activeTab.slug) {
                  case 'all-resources': return <ResourcesTimeline />
                  case 'all-projects': return <ProjectsTimeline />
                  default   : return <Project project={project(this.state.activeTab.slug)} />
                }
              })()}
            </div>
          </div>
        </div>
      );
    }
  }

  return Container;
});