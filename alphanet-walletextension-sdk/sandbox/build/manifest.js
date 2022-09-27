import {Buffer} from "./_snowpack/pkg/buffer.js";
export class Manifest {
  constructor(instructions) {
    this.instructions = instructions;
  }
  toString() {
    return this.instructions.join("\n");
  }
}
export class ManifestBuilder {
  constructor() {
    this.instructions = [];
    this.buckets = new Map();
    this.proofs = new Map();
    this.id_allocator = 512;
  }
  takeFromWorktop(resourceAddress, bucketName) {
    this.instructions.push('TAKE_FROM_WORKTOP ResourceAddress("' + resourceAddress + '") Bucket("' + bucketName + '");');
    this.buckets.set(bucketName, this.id_allocator++);
    return this;
  }
  takeFromWorktopByAmount(amount, resourceAddress, bucketName) {
    this.instructions.push('TAKE_FROM_WORKTOP_BY_AMOUNT Decimal("' + amount + '") ResourceAddress("' + resourceAddress + '") Bucket("' + bucketName + '");');
    this.buckets.set(bucketName, this.id_allocator++);
    return this;
  }
  takeFromWorktopByIds(nonFungibleIds, resourceAddress, bucketName) {
    this.instructions.push("TAKE_FROM_WORKTOP_BY_IDS " + this.formatNonFungibleIds(nonFungibleIds) + ' ResourceAddress("' + resourceAddress + '") Bucket("' + bucketName + '");');
    this.buckets.set(bucketName, this.id_allocator++);
    return this;
  }
  returnToWorktop(bucketName) {
    this.instructions.push('RETURN_TO_WORKTOP Bucket("' + bucketName + '");');
    return this;
  }
  assertWorktopContains(resourceAddress) {
    this.instructions.push('ASSERT_WORKTOP_CONTAINS ResourceAddress("' + resourceAddress + '");');
    return this;
  }
  assertWorktopContainsByAmount(amount, resourceAddress) {
    this.instructions.push('ASSERT_WORKTOP_CONTAINS_BY_AMOUNT Decimal("' + amount + '") ResourceAddress("' + resourceAddress + '");');
    return this;
  }
  assertWorktopContainsByIds(nonFungibleIds, resourceAddress) {
    this.instructions.push("ASSERT_WORKTOP_CONTAINS_BY_IDS " + this.formatNonFungibleIds(nonFungibleIds) + ' ResourceAddress("' + resourceAddress + '");');
    return this;
  }
  popFromAuthZone(proofName) {
    this.instructions.push('POP_FROM_AUTH_ZONE Proof("' + proofName + '");');
    this.proofs.set(proofName, this.id_allocator++);
    return this;
  }
  pushToAuthZone(proofName) {
    this.instructions.push('PUSH_TO_AUTH_ZONE Proof("' + proofName + '");');
    return this;
  }
  clearAuthZone() {
    this.instructions.push("CLEAR_AUTH_ZONE;");
    return this;
  }
  createProofFromAuthZone(resourceAddress, proofName) {
    this.instructions.push('CREATE_PROOF_FROM_AUTH_ZONE ResourceAddress("' + resourceAddress + '") Proof("' + proofName + '");');
    this.proofs.set(proofName, this.id_allocator++);
    return this;
  }
  createProofFromAuthZoneByAmount(amount, resourceAddress, proofName) {
    this.instructions.push('CREATE_PROOF_FROM_AUTH_ZONE_BY_AMOUNT Decimal("' + amount + '") ResourceAddress("' + resourceAddress + '") Proof("' + proofName + '");');
    this.proofs.set(proofName, this.id_allocator++);
    return this;
  }
  createProofFromAuthZoneByIds(nonFungibleIds, resourceAddress, proofName) {
    this.instructions.push("CREATE_PROOF_FROM_AUTH_ZONE_BY_IDS " + this.formatNonFungibleIds(nonFungibleIds) + ' ResourceAddress("' + resourceAddress + '") Proof("' + proofName + '");');
    this.proofs.set(proofName, this.id_allocator++);
    return this;
  }
  createProofFromBucket(bucketName, proofName) {
    this.instructions.push('CREATE_PROOF_FROM_BUCKET Bucket("' + bucketName + '") Proof("' + proofName + '");');
    this.proofs.set(proofName, this.id_allocator++);
    return this;
  }
  cloneProof(proofName, cloneName) {
    this.instructions.push('CLONE_PROOF Proof("' + proofName + '") Proof("' + cloneName + '");');
    this.proofs.set(cloneName, this.id_allocator++);
    return this;
  }
  dropProof(proofName) {
    this.instructions.push('DROP_PROOF Proof("' + proofName + '");');
    return this;
  }
  callFunction(packageAddress, blueprintName, functionName, args) {
    this.instructions.push('CALL_FUNCTION PackageAddress("' + packageAddress + '") "' + blueprintName + '" "' + functionName + '" ' + args.join(" ") + ";");
    return this;
  }
  callMethod(componentAddress, methodName, args) {
    this.instructions.push('CALL_METHOD ComponentAddress("' + componentAddress + '") "' + methodName + '" ' + args.join(" ") + ";");
    return this;
  }
  callMethodWithAllResources(componentAddress, methodName) {
    this.instructions.push('CALL_METHOD_WITH_ALL_RESOURCES ComponentAddress("' + componentAddress + '") "' + methodName + '";');
    return this;
  }
  publishPackage(code) {
    var hex = Buffer.from(code).toString("hex");
    this.instructions.push('PUBLISH_PACKAGE Bytes("' + hex + '");');
    return this;
  }
  withdrawFromAccount(accountAddress, resourceAddress) {
    this.instructions.push('CALL_METHOD ComponentAddress("' + accountAddress + '") "withdraw" ResourceAddress("' + resourceAddress + '");');
    return this;
  }
  withdrawFromAccountByAmount(accountAddress, amount, resourceAddress) {
    this.instructions.push('CALL_METHOD ComponentAddress("' + accountAddress + '") "withdraw_by_amount" Decimal("' + amount + '") ResourceAddress("' + resourceAddress + '");');
    return this;
  }
  withdrawFromAccountByIds(accountAddress, nonFungibleIds, resourceAddress) {
    this.instructions.push('CALL_METHOD ComponentAddress("' + accountAddress + '") "withdraw_by_ids" ' + this.formatNonFungibleIds(nonFungibleIds) + ' ResourceAddress("' + resourceAddress + '");');
    return this;
  }
  createProofFromAccount(accountAddress, resourceAddress) {
    this.instructions.push('CALL_METHOD ComponentAddress("' + accountAddress + '") "create_proof" ResourceAddress("' + resourceAddress + '");');
    return this;
  }
  createProofFromAccountByAmount(accountAddress, amount, resourceAddress) {
    this.instructions.push('CALL_METHOD ComponentAddress("' + accountAddress + '") "create_proof_by_amount" Decimal("' + amount + '") ResourceAddress("' + resourceAddress + '");');
    return this;
  }
  createProofFromAccountByIds(accountAddress, nonFungibleIds, resourceAddress) {
    this.instructions.push('CALL_METHOD ComponentAddress("' + accountAddress + '") "create_proof_by_ids" ' + this.formatNonFungibleIds(nonFungibleIds) + ' ResourceAddress("' + resourceAddress + '");');
    return this;
  }
  newAccount(publicKey) {
    const auth = 'Enum("Protected", Enum("ProofRule", Enum("Require", Enum("StaticNonFungible", NonFungibleAddress("000000000000000000000000000000000000000000000000000002300721000000' + publicKey + '")))))';
    return this.callMethod("system_sim1qsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqs9fh54n", "free_xrd", []).takeFromWorktop("resource_sim1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqu57yag", "xrd").callFunction("package_sim1qyqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpsuluv44", "Account", "new_with_resource", [auth, 'Bucket("xrd")']);
  }
  build() {
    return new Manifest(this.instructions);
  }
  formatNonFungibleIds(nonFungibleIds) {
    let ids = nonFungibleIds.map((id) => 'NonFungibleId("' + id + '")').join(", ");
    return "TreeSet<NonFungibleId>(" + ids + ")";
  }
}
