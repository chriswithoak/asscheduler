const config = require('../config/config');

module.exports = function (leadModel) {
  const xmlBody = `<AddressValidateRequest USERID="${config.USPS_USER_ID}">
      <Revision>1</Revision>
      <Address>
        <Address1>${leadModel.streetAddress}</Address1>
        <Address2>${leadModel.addressLine2}</Address2>
        <City>${leadModel.city}</City>
        <State>${leadModel.state}</State>
        <Zip5>${leadModel.zipCode}</Zip5>
        <Zip4></Zip4>
      </Address>
    </AddressValidateRequest>`;
  return xmlBody;
};