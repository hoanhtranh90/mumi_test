import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/documents/list';
import ListHeader from './ListHeader';

const mapStateToProps = state => ({
  query: selectors.querySelector(state),
  mode: selectors.modeSelector(state),
});

const mapDispatchToProps = {
  updateQuery: actions.updateQuery,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListHeader);
