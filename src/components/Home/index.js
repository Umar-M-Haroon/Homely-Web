import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            chores: [],
        };
    }
    componentDidMount() {
        var allChores = []
        this.setState({ loading: false });
        
        this.props.firebase.homes()
            .then(querySnapshot => {
                console.log("TEST");
                console.log(this.props.firebase.auth.currentUser.uid);
                console.log(querySnapshot.docs);
                querySnapshot.forEach(doc => {
                    console.log(querySnapshot);
                    doc.data().Chores.forEach(chore => {
                        allChores.push(chore.Title);
                        return chore.Title;
                    });
                    console.log(doc.data);
                    this.setState({
                        chores: allChores,
                        loading: false,
                    })
                    console.log(allChores);
                })
            }).catch(error => {
                console.log("error fetching Homes");
                console.log(error);
            });
    }

    componentWillUnmount() {
        // this.props.firebase.users().off();
    }

    render() {
        const { chores, loading } = this.state;
        return (
            <div>
                <h1>Admin</h1>

                {loading && <div>Loading ...</div>}
                {<ChoresList chores={chores} />}
            </div>
        );
    }
}

const ChoresList = ({ chores }) => (
    <ul>
        {chores.map(chore => (
         <li>
             <span>
                 <strong>Title</strong> {chore}
             </span>
         </li>
        ))}
    </ul>
);

const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(Home));

