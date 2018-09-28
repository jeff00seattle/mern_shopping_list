import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

class ShoppingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {id: uuid(), name: 'Eggs'},
                {id: uuid(), name: 'Coffee'},
                {id: uuid(), name: 'Water'},
                {id: uuid(), name: 'Milk'}
            ]}
    }

    render() {
        const { items } = this.state;
        return(
            <Container>
            <Button
            color="dark"
            style={{marginBottom: '2rem'}}
            onClick={() => {
                const name = prompt('Enter Item');
                if (name) {
                    this.setState(state => ({
                        items: [...state.items, {id: uuid.v4(), name}]
                    }));
                }
            }}>Add Item</Button>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            this.setState(state => ({
                                                items: state.items.filter(item => item.id !== id)
                                            }))
                                        }}
                                    >
                                        &times;
                                    </Button>

                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

export default ShoppingList;

// class ShoppingList extends Component {
//   componentDidMount() {
//     this.props.getItems();
//   }
//
//   onDeleteClick = id => {
//     this.props.deleteItem(id);
//   };
//
//   render() {
//     const { items } = this.props.item;
//     return (
//       <Container>
//         <ListGroup>
//           <TransitionGroup className="shopping-list">
//             {items.map(({ _id, name }) => (
//               <CSSTransition key={_id} timeout={500} classNames="fade">
//                 <ListGroupItem>
//                   <Button
//                     className="remove-btn"
//                     color="danger"
//                     size="sm"
//                     onClick={this.onDeleteClick.bind(this, _id)}
//                   >
//                     &times;
//                   </Button>
//                   {name}
//                 </ListGroupItem>
//               </CSSTransition>
//             ))}
//           </TransitionGroup>
//         </ListGroup>
//       </Container>
//     );
//   }
// }
//
// ShoppingList.propTypes = {
//   getItems: PropTypes.func.isRequired,
//   item: PropTypes.object.isRequired
// };
//
// const mapStateToProps = state => ({
//   item: state.item
// });
//
// export default connect(
//   mapStateToProps,
//   { getItems, deleteItem }
// )(ShoppingList);
