app('data.describeProjects', () => {
  const months = app('util.months');

  const {project,founder,founders,developer,designer,developers,designers} = app('data.store');

  founders('kapil', 'vivek');
  developers(1,2,3,4,5,6);
  designers(1,2,3,4,5,6);


  return () => {
    project('Forms App', 'forms-app', 3)
      .addResource(founder('kapil'), months(1), 'dev-api')
      .addResource(founder('kapil'), months(2), 'dev-ui')
      .addResource(founder('vivek'), months(1,2), 'design-product')
      .addResource(founder('kapil'), months(1,2), 'manage-product')
      .addResource(founder('vivek'), months(2,6), 'manage-product')
      .addResource(developer(1), months(1,2), 'dev-api')
      .addResource(developer(2), months(1,2), 'dev-ui')
      .addResource(developers(1,2), months(3,4), 'dev-product')
      .addResource(developers(1,2), months(3,4), 'support-product')
      .addResource(developers(3,4), months(4,6), 'support-product')
      .addResource(designer(1), months(1,2), 'design-product')
      .addResource(designer(1), months(3,6), 'support-product')
    ;

    project('App Builder Platform', 'app-builder-platform', 9)
      .addResource(founder('kapil'), months(3,4), 'dev-api')
      .addResource(founder('kapil'), months(1,18), 'manage-product')
      .addResource(founder('vivek'), months(1,8), 'design-ui')
      .addResource(designer(1), months(3,6), 'design-ui')
      .addResource(designer(2), months(1,8), 'design-ui')
      .addResource(designer(3), months(4,8), 'design-ui')
      .addResource(founder('kapil'), months(5,6), 'dev-ui')
      .addResource(developers(3,4), months(6,8), 'dev-product')
      .addResource(developers(1,2), months(4,8), 'dev-product')
      .addResource(founder('kapil'), months(6,8), 'dev-product')
      .addResource(developers(1,4), months(8,18), 'support-product')
      .addResource(designers(2,3), months(8,18), 'support-product')
      .addResource(developers(5,6), months(13,18), 'support-product')
      .addResource(designers(5,6), months(13,18), 'support-product')
    ;

    project('App Builder Themes/Widgets', 'app-builder-themes', 15)
      .addResource(founder('vivek'), months(1,18), 'manage-product')
      .addResource(founder('vivek'), months(5,15), 'design-ui')
      .addResource(developers(1,2,3,4), months(9,12), 'dev-product')
      .addResource(developers(2,4), months(12,15), 'dev-product')
      .addResource(designers(1,2), months(5,9), 'design-ui')
      .addResource(designers(3,4), months(9,16), 'design-ui')
      .addResource(designers(1,2,3,4).concat(developers(2,3)), months(12,18), 'support-product')
      .addResource(developers(2,4), months(15,18), 'support-product')
      .addResource(developers(5,6), months(13,18), 'support-product')
      .addResource(designers(5,6), months(13,18), 'support-product')
    ;

    project('App Builder Docs', 'app-builder-docs', 12)
      .addResource(founder('kapil'), months(1,18), 'manage-product')
      .addResource(founder('kapil'), months(10,12), 'dev-product')
      .addResource(designer(4), months(9,10), 'design-ui')
      .addResource(founder('vivek'), months(9,12), 'support-product')
      .addResource(developers(1,2,3,4), months(9,12), 'support-product')
      .addResource(designers(1,2,3,4), months(9,12), 'support-product')
    ;

    project('Themes/Widgets Marketplace', 'themes-widgets-marketplace', 16)
      .addResource(founders('kapil', 'vivek'), months(8,18), 'manage-product')
      .addResource(designers(1,2), months(9,13), 'design-ui')
      .addResource(developers(1,3), months(13,15), 'dev-product')
      .addResource(developers(1,3), months(15,18), 'support-product')
      .addResource(designers(1,2), months(13,18), 'support-product')
      .addResource(developers(5,6), months(13,18), 'support-product')
      .addResource(designers(5,6), months(13,18), 'support-product')
    ;
  };

});