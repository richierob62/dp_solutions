//Knapsack algorithm

// DP[item i][space available]
// = max of:
// a) (value of choosing i) + DP[previous i][space left if chosen]
// b) DP[previous i][space left if NOT chosen]

// collections
var DP = [];
var bounty = [];
var selected_items = [];

// define maximum weight
const MAXIMUM_WEIGHT = 12;

// define items
var items = [
    {
        name: 'item1',
        weight: 6,
        value: 30
    },
    {
        name: 'item2',
        weight: 3,
        value: 14
    },
    {
        name: 'item3',
        weight: 4,
        value: 16
    },
    {
        name: 'item4',
        weight: 2,
        value: 9
    },
    {
        name: 'item5',
        weight: 5,
        value: 20
    }
];

// define available space options
var space_avail = [];
for (var i = 0; i <= MAXIMUM_WEIGHT; i++) {
    space_avail.push(i);
}

const getDP = (item, weight) => {
    if (item < 0 || weight < 0)
        return 0;
    return DP[item][weight];
};

const initDPsAndBounties = () => {
    // loop through items and weights
    for (var i = 0; i < items.length; i++) {
        DP[i] = [];
        bounty[i] = [];
        for (var j = 0; j < space_avail.length; j++) {
            DP[i][j] = 0;
            bounty[i][j] = 0;
        }
    }
};

const calculateDPs = () => {
    // loop through items and weights
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        for (var j = 0; j < space_avail.length; j++) {
            // if j < item.weight, no take
            if (j < item.weight) {
                DP[i][j] = getDP(i-1, j);
            }
            else {
                // eval take and leave, take max
                var takeVal = item.value + getDP(i-1,j-item.weight);
                var leaveVal = getDP(i-1,j);
                DP[i][j] = (takeVal > leaveVal) ? takeVal : leaveVal;
                bounty[i][j] = (takeVal > leaveVal) ? 1 : 0;
            }
        }
    }
};


const collateSelectedItems = () => {
    var weight_avail = MAXIMUM_WEIGHT;
    var item_index  = items.length -1 ;
    for(item_index; item_index >= 0; item_index--){
        if(bounty[item_index][weight_avail] === 1){
          selected_items.push(items[item_index]);
          weight_avail -= items[item_index].weight;
        }
    }
};

initDPsAndBounties();
calculateDPs();
collateSelectedItems();
console.log('Maximum Weight: ', MAXIMUM_WEIGHT, '\n');
console.log('Available Items:', items.reduce( (accum, item) => {
    return accum + item.name + ' weighing ' + item.weight + ', valued at ' + item.value + '\n';
},'\n'));
console.log('DP \n', DP, '\n');
console.log('Maximum Value: ', DP[items.length-1][MAXIMUM_WEIGHT], '\n');
console.log('Selected Items:', selected_items.reduce( (accum, item) => {
    return accum + item.name + ' weighing ' + item.weight + ', valued at ' + item.value + '\n';
},'\n'));