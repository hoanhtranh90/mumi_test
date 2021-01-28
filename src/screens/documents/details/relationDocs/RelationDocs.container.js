import { connect } from 'react-redux';

import { selectors } from 'eoffice/store/documents/detail';
import { selectors as listSelectors } from 'eoffice/store/documents/list';
import RelationDocs from './RelationDocs';

const mapStateToProps = state => ({
  document: selectors.documentSelector(state),
  mode: listSelectors.modeSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelationDocs);
