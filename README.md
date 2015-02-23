# ampersand-datagrid

[![build status](https://secure.travis-ci.org/imlucas/ampersand-datagrid.png)](http://travis-ci.org/imlucas/ampersand-datagrid)

A fast datagrid component for [ampersand.js][amp] applications.  Inspired by
[facebook/fixed-data-table][fdt].

## Example

```javascript
var AmpersandView = require('ampersand-view'),
  DatagridView = require('ampersand-datagrid');

var MyView = AmpersandView.extend({
  template: [
    '<div>',
    '  <h1>mongo-perf runs for 12/31/2014</h1>',
    '  <div data-hook="datagrid"></div>',
    '</div>'
  ].join('\n'),
  subviews: {
    datagrid: {
      waitFor: 'runs',
      hook: 'datagrid',
      prepareView: function(el){
        return new DatagridView({
          el: el,
          columns: [
            {
              field: 'workload-storage_engine',
              title: 'Workload - Storage Engine',
              active: true,
              direction: DatagridView.DESCENDING
            },
            {
              field: '12/31/2014',
              title: '12/31/2014'
            }
          ],
          collection: this.runs
        });
      }
    }
  }
});

```

## License

MIT

[amp]: http://ampersandjs.com/
[fdt]: http://facebook.github.io/fixed-data-table/
