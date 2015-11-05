app('data.models', () => {
  const range = app('util.range');

  class Project {
    constructor(name, slug, cutoffMonth) {
      this.name = name;
      this.slug = slug;
      this.cutoffMonth = cutoffMonth;

      this.resources = new Set;
      this.responsibilities = new Map;
    }

    addResource(resource, months, involvement) {
      if (Array.isArray(resource)) {
        resource.forEach((r) => {
          this.addResource(r, months, involvement);
        });

        return this;
      }

      const responsibility = new Responsibility(this, resource, involvement, months);
      
      this.resources.add(resource, resource);

      if (! this.responsibilities.has(resource)) {
        this.responsibilities.set(resource, []);
      }

      this.responsibilities.get(resource).push(responsibility);

      resource.projects.add(this);
      resource.addOnProject(this, responsibility);

      return this;
    }

    // delResource(resource) {
    //   this.resources.delete(resource);
    //   this.responsibilities.delete(resource);
    // }
  }

  class Resource {
    constructor(type, id) {
      this.type = type;
      this.id = id;

      this.projects = new Set;
      this.responsibilities = new Map;
    }

    addOnProject(project, responsibility) {
      if (! this.responsibilities.has(project)) {
        this.responsibilities.set(project, []);
      }

      this.responsibilities.get(project).push(responsibility);
      return this;
    }

    responsibilitiesFor(project) {
      if (this.responsibilities.has(project)) {
        return this.responsibilities.get(project);
      } else {
        return [];
      }
    }

    get name() {
      return `${this.type}-${this.id}`;
    }
  }

  class Responsibility {
    constructor(project, resource, involvement, months) {
      this.project = project;
      this.resource = resource;
      this.involvement = involvement;
      this.months = months;
    }

    bgStyle() {
      return {backgroundColor: '#dff0d8'};
    }

    coversMonth(month) {
      return this.months.indexOf(month) > -1;
    }
  }

  return {Project, Resource, Responsibility};
});