app('data.describeProjects', () => {
  const months = app('util.months');

  const {project,founder,developer,designer,developers,designers} = app('data.store');


  return () => {
    project('Forms App', 'forms-app', 3)
      .addResource(founder('kapil'), months(1), 'dev-api')
      .addResource(founder('kapil'), months(2), 'dev-ui')
      .addResource(founder('vivek'), months(1,2), 'design-product')
      .addResource(founder('kapil'), months(1,2), 'manage-product')
      .addResource(founder('vivek'), months(2,6), 'manage-product')
      .addResource(designer(1), months(1,2), 'design-product')
      .addResource(developer(1), months(1,2), 'dev-api')
      .addResource(developer(2), months(1,2), 'dev-ui')
      .addResource(developers(1,2), months(3), 'dev-product')
      .addResource(developers(1,2), months(3), 'support-product')
      .addResource(designer(1), months(3), 'support-product')
      .addResource(developers(3,4), months(4,6), 'support-product')
      .addResource(designer(2), months(4,6), 'support-product')
    ;

    project('App Builder Platform', 'app-builder-platform', 9)
      .addResource(founder('kapil'), months(3), 'dev-api')
      .addResource(founder('kapil'), months(1,12), 'manage-product')
      .addResource(founder('vivek'), months(1,6), 'design-ui')
      .addResource(designer(2), months(1,6), 'design-ui')
      .addResource(designer(1), months(3,6), 'design-ui')
      .addResource(designer(3), months(3,8), 'design-ui')
      .addResource(founder('kapil'), months(4,5), 'dev-ui')
      .addResource(developers(1,2), months(4,6), 'dev-api')
      .addResource(developers(1,2), months(4,6), 'dev-ui')
      .addResource(developers(3,4), months(6,8), 'dev-api')
      .addResource(developers(3,4), months(6,8), 'dev-ui')
      .addResource(developers(1,2), months(4,6), 'dev-product')
      .addResource(founder('kapil'), months(6,8), 'dev-product')
      .addResource(developers(1,2,3,4), months(9,12), 'support-product')
      .addResource(designers(1,2,3), months(9,12), 'support-product')
    ;

    project('App Builder Themes', 'app-builder-themes', 12)
      .addResource(founder('vivek'), months(1,15), 'manage-product')
      .addResource(founder('vivek'), months(5,8), 'design-ui')
      .addResource(designer(1,2), months(5,8), 'design-ui')
      .addResource(designer(3,12), months(9,12), 'design-ui')
      .addResource(designer(4), months(10,12), 'design-ui')
      .addResource(developer(1,2,3,4), months(9,12), 'dev-product')
    ;

    project('App Builder Docs', 'app-builder-docs', 12)
      .addResource(founder('kapil'), months(1,15), 'manage-product')
      .addResource(founder('kapil'), months(9,12), 'dev-product')
      .addResource(designer(4), months(9,10), 'design-ui')
    ;
  };

});