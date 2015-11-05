app('data.store', () => {
  const {Project,Resource} = app('data.models');

  const projects = new Set;
  const resources = new Set;

  function project(name, slug, cutoffMonth) {
    if (slug === undefined) {
      slug = name;

      return Array.from(projects).filter((p) => {
        return p.slug === slug;
      })[0];
    } else {
      const p = new Project(name, slug, cutoffMonth);
      projects.add(p);
      return p;
    }
  }

  function resource(type, id) {
    const res = Array.from(resources).filter((r) => {
      return r.type === type && r.id === id;
    })[0];

    if (res) {
      return res;
    } else {
      resources.add(new Resource(type, id));
      return resource(type, id);
    }
  }

  function founder(id) {
    return resource('founder', id);
  }

  function developer(id) {
    return resource('developer', id);
  }

  function designer(id) {
    return resource('designer', id);
  }

  function developers(...ids) {
    return ids.map((id) => developer(id));
  }

  function designers(...ids) {
    return ids.map((id) => designer(id));
  }

  return {
    projects,
    resources,
    project,
    resource,
    founder,
    developer,
    designer,
    developers,
    designers
  }
});