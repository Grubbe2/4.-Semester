import deals from './Api/deals.json';
import dealdetails from './Api/deal-details.json';


export default {
        fetchInitialDeals() {
                return deals;
        },
        fetchDealDetail(dealId) {
                return dealdetails[dealId];
        },
        fetchDealSearchResults(searchTerm) {
                return deals.filter(deal => {
                        return deal.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                });
        }
};

