var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value
    );
  },
  render: function() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
      </form>
    );
  }
});

var MetaList = React.createClass({
  render: function() {
    return (
      <ul className="list-meta">
        <li>Edit</li>
        <li>/</li>
        <li><a href="#" className="linkdeletelocation" rel={this.props.location._id}>Delete</a></li>
      </ul>
    );
  }
});

var LocationRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.location.locationName}</td>
        <td>{this.props.location.streetAddress}</td>
        <td>{this.props.location.city}</td>
        <td>{this.props.location.state}</td>
        <td>{this.props.location.postal}</td>
        <td>{this.props.location.website}</td>
        <td>{this.props.location.phone}</td>
        <td><MetaList location={this.props.location} /></td>
      </tr>
    );
  }
});

var LocationTable = React.createClass({ 
  render: function() {
    var filterText = this.props.filterText;
    var locationNodes = this.props.locations.map(function(location) {
      if (location.locationName.indexOf(filterText) !== -1) {
        return (
          <LocationRow location={location} key={location.locationName} />
        );
      }
    });

    return (
      <table className="table-full-width">
        <thead>
          <tr>
            <th>Location Name</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Website</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{locationNodes}</tbody>
      </table>
    );
  }
});

var FilterableLocationTable = React.createClass({
  loadLocations: function() {
    $.ajax({
      url: '/api/locations',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data})
      }.bind(this),
      error: function() {

      }
    });
  },

  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false,
      data: []
    };
  },

  componentDidMount: function() {
    this.loadLocations();
    setInterval(this.loadLocations, 2000);
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
        <LocationTable
          locations={this.state.data}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
});

React.render(<FilterableLocationTable data="/api/locations" />, document.getElementById("locationTable"));