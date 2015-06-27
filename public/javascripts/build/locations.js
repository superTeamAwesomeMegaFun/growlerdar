var SearchBar = React.createClass({displayName: "SearchBar",
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value
    );
  },
  render: function() {
    return (
      React.createElement("form", null, 
        React.createElement("input", {
          type: "text", 
          placeholder: "Search...", 
          value: this.props.filterText, 
          ref: "filterTextInput", 
          onChange: this.handleChange}
        )
      )
    );
  }
});

var MetaList = React.createClass({displayName: "MetaList",
  render: function() {
    return (
      React.createElement("ul", {className: "list-meta"}, 
        React.createElement("li", null, "Edit"), 
        React.createElement("li", null, "/"), 
        React.createElement("li", null, React.createElement("a", {href: "#", className: "linkdeletelocation", rel: this.props.location._id}, "Delete"))
      )
    );
  }
});

var LocationRow = React.createClass({displayName: "LocationRow",
  render: function() {
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, this.props.location.locationName), 
        React.createElement("td", null, this.props.location.streetAddress), 
        React.createElement("td", null, this.props.location.city), 
        React.createElement("td", null, this.props.location.state), 
        React.createElement("td", null, this.props.location.postal), 
        React.createElement("td", null, this.props.location.website), 
        React.createElement("td", null, this.props.location.phone), 
        React.createElement("td", null, React.createElement(MetaList, {location: this.props.location}))
      )
    );
  }
});

var LocationTable = React.createClass({displayName: "LocationTable", 
  render: function() {
    var filterText = this.props.filterText;
    var locationNodes = this.props.locations.map(function(location) {
      if (location.locationName.indexOf(filterText) !== -1) {
        return (
          React.createElement(LocationRow, {location: location, key: location.locationName})
        );
      }
    });

    return (
      React.createElement("table", {className: "table-full-width"}, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "Location Name"), 
            React.createElement("th", null, "Street Address"), 
            React.createElement("th", null, "City"), 
            React.createElement("th", null, "State"), 
            React.createElement("th", null, "Zip"), 
            React.createElement("th", null, "Website"), 
            React.createElement("th", null, "Phone Number"), 
            React.createElement("th", null)
          )
        ), 
        React.createElement("tbody", null, locationNodes)
      )
    );
  }
});

var FilterableLocationTable = React.createClass({displayName: "FilterableLocationTable",
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false,
      data: []
    };
  },

  componentDidMount: function() {
    $.get(this.props.locations, function(result) {
      if (this.isMounted()) {
        this.setState({
          data: result
        });
      }
    }.bind(this));
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(SearchBar, {
          filterText: this.state.filterText, 
          onUserInput: this.handleUserInput}
        ), 
        React.createElement(LocationTable, {
          locations: this.state.data, 
          filterText: this.state.filterText}
        )
      )
    );
  }
});

React.render(React.createElement(FilterableLocationTable, {locations: "/api/locations"}), document.getElementById("locationTable"));