app('data.team', () => {
  const range = app('util.range');

  const founders = [
    {slug: 'kapil', name: 'Kapil'},
    {slug: 'vivek', name: 'Vivek'}
  ];

  const developers = [];
  const designers = [];

  return {
    founder(slug) {
      return founders.filter((f) => (slug === f.slug))[0];
    },

    founders() {
      return founders;
    },

    developer(num) {
      return {name: `Developer ${num}`, slug: `dev-${num}`};
    },

    designer(num) {
      return {name: `Designer ${num}`, slug: `des-${num}`};
    },

    developers(num) {
      return range(1, num+1).map((i) => { return this.developer(i); });
    },

    designers(num) {
      return range(1, num+1).map((i) => { return this.designer(i); });
    }
  }
});