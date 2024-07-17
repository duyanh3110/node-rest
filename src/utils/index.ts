import _ from "lodash";
const getInfoData = ({
    fields = [],
    object = {},
}: {
    fields: Array<string>;
    object: Object;
}) => {
    return _.pick(object, fields);
};

const AppUtils = { getInfoData };

export default AppUtils;
