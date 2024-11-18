module Example.Validator

validator {
    fn main(_datum: Data, redeemer: Data, _ctx: Data) -> Bool {
        case redeemer {
            Int(42) -> True
            _ -> False
        }
    }
}
