
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model NurseDetail
 * 
 */
export type NurseDetail = $Result.DefaultSelection<Prisma.$NurseDetailPayload>
/**
 * Model DailyActivity
 * 
 */
export type DailyActivity = $Result.DefaultSelection<Prisma.$DailyActivityPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model ReposisiHistory
 * 
 */
export type ReposisiHistory = $Result.DefaultSelection<Prisma.$ReposisiHistoryPayload>
/**
 * Model PatientHandle
 * 
 */
export type PatientHandle = $Result.DefaultSelection<Prisma.$PatientHandlePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const NurseStatus: {
  ON_SHIFT: 'ON_SHIFT',
  OFF_SHIFT: 'OFF_SHIFT'
};

export type NurseStatus = (typeof NurseStatus)[keyof typeof NurseStatus]


export const Role: {
  KEPALA_PERAWAT: 'KEPALA_PERAWAT',
  PERAWAT: 'PERAWAT'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Gender: {
  LAKI_LAKI: 'LAKI_LAKI',
  PEREMPUAN: 'PEREMPUAN'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const Status: {
  ACTIVE: 'ACTIVE',
  NON_ACTIVE: 'NON_ACTIVE'
};

export type Status = (typeof Status)[keyof typeof Status]


export const Resiko: {
  TINGGI: 'TINGGI',
  SEDANG: 'SEDANG',
  RENDAH: 'RENDAH',
  SANGAT_TINGGI: 'SANGAT_TINGGI'
};

export type Resiko = (typeof Resiko)[keyof typeof Resiko]

}

export type NurseStatus = $Enums.NurseStatus

export const NurseStatus: typeof $Enums.NurseStatus

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type Resiko = $Enums.Resiko

export const Resiko: typeof $Enums.Resiko

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nurseDetail`: Exposes CRUD operations for the **NurseDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NurseDetails
    * const nurseDetails = await prisma.nurseDetail.findMany()
    * ```
    */
  get nurseDetail(): Prisma.NurseDetailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyActivity`: Exposes CRUD operations for the **DailyActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyActivities
    * const dailyActivities = await prisma.dailyActivity.findMany()
    * ```
    */
  get dailyActivity(): Prisma.DailyActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reposisiHistory`: Exposes CRUD operations for the **ReposisiHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReposisiHistories
    * const reposisiHistories = await prisma.reposisiHistory.findMany()
    * ```
    */
  get reposisiHistory(): Prisma.ReposisiHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patientHandle`: Exposes CRUD operations for the **PatientHandle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatientHandles
    * const patientHandles = await prisma.patientHandle.findMany()
    * ```
    */
  get patientHandle(): Prisma.PatientHandleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    NurseDetail: 'NurseDetail',
    DailyActivity: 'DailyActivity',
    Patient: 'Patient',
    ReposisiHistory: 'ReposisiHistory',
    PatientHandle: 'PatientHandle'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "nurseDetail" | "dailyActivity" | "patient" | "reposisiHistory" | "patientHandle"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      NurseDetail: {
        payload: Prisma.$NurseDetailPayload<ExtArgs>
        fields: Prisma.NurseDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NurseDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NurseDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload>
          }
          findFirst: {
            args: Prisma.NurseDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NurseDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload>
          }
          findMany: {
            args: Prisma.NurseDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload>[]
          }
          create: {
            args: Prisma.NurseDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload>
          }
          createMany: {
            args: Prisma.NurseDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NurseDetailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload>[]
          }
          delete: {
            args: Prisma.NurseDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload>
          }
          update: {
            args: Prisma.NurseDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload>
          }
          deleteMany: {
            args: Prisma.NurseDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NurseDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NurseDetailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload>[]
          }
          upsert: {
            args: Prisma.NurseDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NurseDetailPayload>
          }
          aggregate: {
            args: Prisma.NurseDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNurseDetail>
          }
          groupBy: {
            args: Prisma.NurseDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<NurseDetailGroupByOutputType>[]
          }
          count: {
            args: Prisma.NurseDetailCountArgs<ExtArgs>
            result: $Utils.Optional<NurseDetailCountAggregateOutputType> | number
          }
        }
      }
      DailyActivity: {
        payload: Prisma.$DailyActivityPayload<ExtArgs>
        fields: Prisma.DailyActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload>
          }
          findFirst: {
            args: Prisma.DailyActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload>
          }
          findMany: {
            args: Prisma.DailyActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload>[]
          }
          create: {
            args: Prisma.DailyActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload>
          }
          createMany: {
            args: Prisma.DailyActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload>[]
          }
          delete: {
            args: Prisma.DailyActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload>
          }
          update: {
            args: Prisma.DailyActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload>
          }
          deleteMany: {
            args: Prisma.DailyActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload>[]
          }
          upsert: {
            args: Prisma.DailyActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyActivityPayload>
          }
          aggregate: {
            args: Prisma.DailyActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyActivity>
          }
          groupBy: {
            args: Prisma.DailyActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyActivityCountArgs<ExtArgs>
            result: $Utils.Optional<DailyActivityCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      ReposisiHistory: {
        payload: Prisma.$ReposisiHistoryPayload<ExtArgs>
        fields: Prisma.ReposisiHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReposisiHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReposisiHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload>
          }
          findFirst: {
            args: Prisma.ReposisiHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReposisiHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload>
          }
          findMany: {
            args: Prisma.ReposisiHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload>[]
          }
          create: {
            args: Prisma.ReposisiHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload>
          }
          createMany: {
            args: Prisma.ReposisiHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReposisiHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload>[]
          }
          delete: {
            args: Prisma.ReposisiHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload>
          }
          update: {
            args: Prisma.ReposisiHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload>
          }
          deleteMany: {
            args: Prisma.ReposisiHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReposisiHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReposisiHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload>[]
          }
          upsert: {
            args: Prisma.ReposisiHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReposisiHistoryPayload>
          }
          aggregate: {
            args: Prisma.ReposisiHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReposisiHistory>
          }
          groupBy: {
            args: Prisma.ReposisiHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReposisiHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReposisiHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<ReposisiHistoryCountAggregateOutputType> | number
          }
        }
      }
      PatientHandle: {
        payload: Prisma.$PatientHandlePayload<ExtArgs>
        fields: Prisma.PatientHandleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientHandleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientHandleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload>
          }
          findFirst: {
            args: Prisma.PatientHandleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientHandleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload>
          }
          findMany: {
            args: Prisma.PatientHandleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload>[]
          }
          create: {
            args: Prisma.PatientHandleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload>
          }
          createMany: {
            args: Prisma.PatientHandleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientHandleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload>[]
          }
          delete: {
            args: Prisma.PatientHandleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload>
          }
          update: {
            args: Prisma.PatientHandleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload>
          }
          deleteMany: {
            args: Prisma.PatientHandleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientHandleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientHandleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload>[]
          }
          upsert: {
            args: Prisma.PatientHandleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientHandlePayload>
          }
          aggregate: {
            args: Prisma.PatientHandleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatientHandle>
          }
          groupBy: {
            args: Prisma.PatientHandleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientHandleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientHandleCountArgs<ExtArgs>
            result: $Utils.Optional<PatientHandleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    nurseDetail?: NurseDetailOmit
    dailyActivity?: DailyActivityOmit
    patient?: PatientOmit
    reposisiHistory?: ReposisiHistoryOmit
    patientHandle?: PatientHandleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    reposisiHistory: number
    nurseDetail: number
    DailyActivity: number
    PatientHandle: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reposisiHistory?: boolean | UserCountOutputTypeCountReposisiHistoryArgs
    nurseDetail?: boolean | UserCountOutputTypeCountNurseDetailArgs
    DailyActivity?: boolean | UserCountOutputTypeCountDailyActivityArgs
    PatientHandle?: boolean | UserCountOutputTypeCountPatientHandleArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReposisiHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReposisiHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNurseDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NurseDetailWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDailyActivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyActivityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPatientHandleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientHandleWhereInput
  }


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    reposisi: number
    PatientHandle: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reposisi?: boolean | PatientCountOutputTypeCountReposisiArgs
    PatientHandle?: boolean | PatientCountOutputTypeCountPatientHandleArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountReposisiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReposisiHistoryWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountPatientHandleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientHandleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    role: number
    name: number
    email: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    role?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    role?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    role?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reposisiHistory?: boolean | User$reposisiHistoryArgs<ExtArgs>
    nurseDetail?: boolean | User$nurseDetailArgs<ExtArgs>
    DailyActivity?: boolean | User$DailyActivityArgs<ExtArgs>
    PatientHandle?: boolean | User$PatientHandleArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    role?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "name" | "email" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reposisiHistory?: boolean | User$reposisiHistoryArgs<ExtArgs>
    nurseDetail?: boolean | User$nurseDetailArgs<ExtArgs>
    DailyActivity?: boolean | User$DailyActivityArgs<ExtArgs>
    PatientHandle?: boolean | User$PatientHandleArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      reposisiHistory: Prisma.$ReposisiHistoryPayload<ExtArgs>[]
      nurseDetail: Prisma.$NurseDetailPayload<ExtArgs>[]
      DailyActivity: Prisma.$DailyActivityPayload<ExtArgs>[]
      PatientHandle: Prisma.$PatientHandlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.Role
      name: string
      email: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reposisiHistory<T extends User$reposisiHistoryArgs<ExtArgs> = {}>(args?: Subset<T, User$reposisiHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nurseDetail<T extends User$nurseDetailArgs<ExtArgs> = {}>(args?: Subset<T, User$nurseDetailArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    DailyActivity<T extends User$DailyActivityArgs<ExtArgs> = {}>(args?: Subset<T, User$DailyActivityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    PatientHandle<T extends User$PatientHandleArgs<ExtArgs> = {}>(args?: Subset<T, User$PatientHandleArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.reposisiHistory
   */
  export type User$reposisiHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    where?: ReposisiHistoryWhereInput
    orderBy?: ReposisiHistoryOrderByWithRelationInput | ReposisiHistoryOrderByWithRelationInput[]
    cursor?: ReposisiHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReposisiHistoryScalarFieldEnum | ReposisiHistoryScalarFieldEnum[]
  }

  /**
   * User.nurseDetail
   */
  export type User$nurseDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
    where?: NurseDetailWhereInput
    orderBy?: NurseDetailOrderByWithRelationInput | NurseDetailOrderByWithRelationInput[]
    cursor?: NurseDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NurseDetailScalarFieldEnum | NurseDetailScalarFieldEnum[]
  }

  /**
   * User.DailyActivity
   */
  export type User$DailyActivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
    where?: DailyActivityWhereInput
    orderBy?: DailyActivityOrderByWithRelationInput | DailyActivityOrderByWithRelationInput[]
    cursor?: DailyActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyActivityScalarFieldEnum | DailyActivityScalarFieldEnum[]
  }

  /**
   * User.PatientHandle
   */
  export type User$PatientHandleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    where?: PatientHandleWhereInput
    orderBy?: PatientHandleOrderByWithRelationInput | PatientHandleOrderByWithRelationInput[]
    cursor?: PatientHandleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientHandleScalarFieldEnum | PatientHandleScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model NurseDetail
   */

  export type AggregateNurseDetail = {
    _count: NurseDetailCountAggregateOutputType | null
    _min: NurseDetailMinAggregateOutputType | null
    _max: NurseDetailMaxAggregateOutputType | null
  }

  export type NurseDetailMinAggregateOutputType = {
    id: string | null
    userId: string | null
    phone: string | null
    address: string | null
    nurseStatus: $Enums.NurseStatus | null
  }

  export type NurseDetailMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    phone: string | null
    address: string | null
    nurseStatus: $Enums.NurseStatus | null
  }

  export type NurseDetailCountAggregateOutputType = {
    id: number
    userId: number
    phone: number
    address: number
    nurseStatus: number
    _all: number
  }


  export type NurseDetailMinAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    address?: true
    nurseStatus?: true
  }

  export type NurseDetailMaxAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    address?: true
    nurseStatus?: true
  }

  export type NurseDetailCountAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    address?: true
    nurseStatus?: true
    _all?: true
  }

  export type NurseDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NurseDetail to aggregate.
     */
    where?: NurseDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NurseDetails to fetch.
     */
    orderBy?: NurseDetailOrderByWithRelationInput | NurseDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NurseDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NurseDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NurseDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NurseDetails
    **/
    _count?: true | NurseDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NurseDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NurseDetailMaxAggregateInputType
  }

  export type GetNurseDetailAggregateType<T extends NurseDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateNurseDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNurseDetail[P]>
      : GetScalarType<T[P], AggregateNurseDetail[P]>
  }




  export type NurseDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NurseDetailWhereInput
    orderBy?: NurseDetailOrderByWithAggregationInput | NurseDetailOrderByWithAggregationInput[]
    by: NurseDetailScalarFieldEnum[] | NurseDetailScalarFieldEnum
    having?: NurseDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NurseDetailCountAggregateInputType | true
    _min?: NurseDetailMinAggregateInputType
    _max?: NurseDetailMaxAggregateInputType
  }

  export type NurseDetailGroupByOutputType = {
    id: string
    userId: string
    phone: string
    address: string
    nurseStatus: $Enums.NurseStatus
    _count: NurseDetailCountAggregateOutputType | null
    _min: NurseDetailMinAggregateOutputType | null
    _max: NurseDetailMaxAggregateOutputType | null
  }

  type GetNurseDetailGroupByPayload<T extends NurseDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NurseDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NurseDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NurseDetailGroupByOutputType[P]>
            : GetScalarType<T[P], NurseDetailGroupByOutputType[P]>
        }
      >
    >


  export type NurseDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    nurseStatus?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nurseDetail"]>

  export type NurseDetailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    nurseStatus?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nurseDetail"]>

  export type NurseDetailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    nurseStatus?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nurseDetail"]>

  export type NurseDetailSelectScalar = {
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    nurseStatus?: boolean
  }

  export type NurseDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "phone" | "address" | "nurseStatus", ExtArgs["result"]["nurseDetail"]>
  export type NurseDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NurseDetailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NurseDetailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NurseDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NurseDetail"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      phone: string
      address: string
      nurseStatus: $Enums.NurseStatus
    }, ExtArgs["result"]["nurseDetail"]>
    composites: {}
  }

  type NurseDetailGetPayload<S extends boolean | null | undefined | NurseDetailDefaultArgs> = $Result.GetResult<Prisma.$NurseDetailPayload, S>

  type NurseDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NurseDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NurseDetailCountAggregateInputType | true
    }

  export interface NurseDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NurseDetail'], meta: { name: 'NurseDetail' } }
    /**
     * Find zero or one NurseDetail that matches the filter.
     * @param {NurseDetailFindUniqueArgs} args - Arguments to find a NurseDetail
     * @example
     * // Get one NurseDetail
     * const nurseDetail = await prisma.nurseDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NurseDetailFindUniqueArgs>(args: SelectSubset<T, NurseDetailFindUniqueArgs<ExtArgs>>): Prisma__NurseDetailClient<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NurseDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NurseDetailFindUniqueOrThrowArgs} args - Arguments to find a NurseDetail
     * @example
     * // Get one NurseDetail
     * const nurseDetail = await prisma.nurseDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NurseDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, NurseDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NurseDetailClient<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NurseDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NurseDetailFindFirstArgs} args - Arguments to find a NurseDetail
     * @example
     * // Get one NurseDetail
     * const nurseDetail = await prisma.nurseDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NurseDetailFindFirstArgs>(args?: SelectSubset<T, NurseDetailFindFirstArgs<ExtArgs>>): Prisma__NurseDetailClient<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NurseDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NurseDetailFindFirstOrThrowArgs} args - Arguments to find a NurseDetail
     * @example
     * // Get one NurseDetail
     * const nurseDetail = await prisma.nurseDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NurseDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, NurseDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__NurseDetailClient<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NurseDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NurseDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NurseDetails
     * const nurseDetails = await prisma.nurseDetail.findMany()
     * 
     * // Get first 10 NurseDetails
     * const nurseDetails = await prisma.nurseDetail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nurseDetailWithIdOnly = await prisma.nurseDetail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NurseDetailFindManyArgs>(args?: SelectSubset<T, NurseDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NurseDetail.
     * @param {NurseDetailCreateArgs} args - Arguments to create a NurseDetail.
     * @example
     * // Create one NurseDetail
     * const NurseDetail = await prisma.nurseDetail.create({
     *   data: {
     *     // ... data to create a NurseDetail
     *   }
     * })
     * 
     */
    create<T extends NurseDetailCreateArgs>(args: SelectSubset<T, NurseDetailCreateArgs<ExtArgs>>): Prisma__NurseDetailClient<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NurseDetails.
     * @param {NurseDetailCreateManyArgs} args - Arguments to create many NurseDetails.
     * @example
     * // Create many NurseDetails
     * const nurseDetail = await prisma.nurseDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NurseDetailCreateManyArgs>(args?: SelectSubset<T, NurseDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NurseDetails and returns the data saved in the database.
     * @param {NurseDetailCreateManyAndReturnArgs} args - Arguments to create many NurseDetails.
     * @example
     * // Create many NurseDetails
     * const nurseDetail = await prisma.nurseDetail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NurseDetails and only return the `id`
     * const nurseDetailWithIdOnly = await prisma.nurseDetail.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NurseDetailCreateManyAndReturnArgs>(args?: SelectSubset<T, NurseDetailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NurseDetail.
     * @param {NurseDetailDeleteArgs} args - Arguments to delete one NurseDetail.
     * @example
     * // Delete one NurseDetail
     * const NurseDetail = await prisma.nurseDetail.delete({
     *   where: {
     *     // ... filter to delete one NurseDetail
     *   }
     * })
     * 
     */
    delete<T extends NurseDetailDeleteArgs>(args: SelectSubset<T, NurseDetailDeleteArgs<ExtArgs>>): Prisma__NurseDetailClient<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NurseDetail.
     * @param {NurseDetailUpdateArgs} args - Arguments to update one NurseDetail.
     * @example
     * // Update one NurseDetail
     * const nurseDetail = await prisma.nurseDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NurseDetailUpdateArgs>(args: SelectSubset<T, NurseDetailUpdateArgs<ExtArgs>>): Prisma__NurseDetailClient<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NurseDetails.
     * @param {NurseDetailDeleteManyArgs} args - Arguments to filter NurseDetails to delete.
     * @example
     * // Delete a few NurseDetails
     * const { count } = await prisma.nurseDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NurseDetailDeleteManyArgs>(args?: SelectSubset<T, NurseDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NurseDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NurseDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NurseDetails
     * const nurseDetail = await prisma.nurseDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NurseDetailUpdateManyArgs>(args: SelectSubset<T, NurseDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NurseDetails and returns the data updated in the database.
     * @param {NurseDetailUpdateManyAndReturnArgs} args - Arguments to update many NurseDetails.
     * @example
     * // Update many NurseDetails
     * const nurseDetail = await prisma.nurseDetail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NurseDetails and only return the `id`
     * const nurseDetailWithIdOnly = await prisma.nurseDetail.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NurseDetailUpdateManyAndReturnArgs>(args: SelectSubset<T, NurseDetailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NurseDetail.
     * @param {NurseDetailUpsertArgs} args - Arguments to update or create a NurseDetail.
     * @example
     * // Update or create a NurseDetail
     * const nurseDetail = await prisma.nurseDetail.upsert({
     *   create: {
     *     // ... data to create a NurseDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NurseDetail we want to update
     *   }
     * })
     */
    upsert<T extends NurseDetailUpsertArgs>(args: SelectSubset<T, NurseDetailUpsertArgs<ExtArgs>>): Prisma__NurseDetailClient<$Result.GetResult<Prisma.$NurseDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NurseDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NurseDetailCountArgs} args - Arguments to filter NurseDetails to count.
     * @example
     * // Count the number of NurseDetails
     * const count = await prisma.nurseDetail.count({
     *   where: {
     *     // ... the filter for the NurseDetails we want to count
     *   }
     * })
    **/
    count<T extends NurseDetailCountArgs>(
      args?: Subset<T, NurseDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NurseDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NurseDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NurseDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NurseDetailAggregateArgs>(args: Subset<T, NurseDetailAggregateArgs>): Prisma.PrismaPromise<GetNurseDetailAggregateType<T>>

    /**
     * Group by NurseDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NurseDetailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NurseDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NurseDetailGroupByArgs['orderBy'] }
        : { orderBy?: NurseDetailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NurseDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNurseDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NurseDetail model
   */
  readonly fields: NurseDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NurseDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NurseDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NurseDetail model
   */
  interface NurseDetailFieldRefs {
    readonly id: FieldRef<"NurseDetail", 'String'>
    readonly userId: FieldRef<"NurseDetail", 'String'>
    readonly phone: FieldRef<"NurseDetail", 'String'>
    readonly address: FieldRef<"NurseDetail", 'String'>
    readonly nurseStatus: FieldRef<"NurseDetail", 'NurseStatus'>
  }
    

  // Custom InputTypes
  /**
   * NurseDetail findUnique
   */
  export type NurseDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
    /**
     * Filter, which NurseDetail to fetch.
     */
    where: NurseDetailWhereUniqueInput
  }

  /**
   * NurseDetail findUniqueOrThrow
   */
  export type NurseDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
    /**
     * Filter, which NurseDetail to fetch.
     */
    where: NurseDetailWhereUniqueInput
  }

  /**
   * NurseDetail findFirst
   */
  export type NurseDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
    /**
     * Filter, which NurseDetail to fetch.
     */
    where?: NurseDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NurseDetails to fetch.
     */
    orderBy?: NurseDetailOrderByWithRelationInput | NurseDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NurseDetails.
     */
    cursor?: NurseDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NurseDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NurseDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NurseDetails.
     */
    distinct?: NurseDetailScalarFieldEnum | NurseDetailScalarFieldEnum[]
  }

  /**
   * NurseDetail findFirstOrThrow
   */
  export type NurseDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
    /**
     * Filter, which NurseDetail to fetch.
     */
    where?: NurseDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NurseDetails to fetch.
     */
    orderBy?: NurseDetailOrderByWithRelationInput | NurseDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NurseDetails.
     */
    cursor?: NurseDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NurseDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NurseDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NurseDetails.
     */
    distinct?: NurseDetailScalarFieldEnum | NurseDetailScalarFieldEnum[]
  }

  /**
   * NurseDetail findMany
   */
  export type NurseDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
    /**
     * Filter, which NurseDetails to fetch.
     */
    where?: NurseDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NurseDetails to fetch.
     */
    orderBy?: NurseDetailOrderByWithRelationInput | NurseDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NurseDetails.
     */
    cursor?: NurseDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NurseDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NurseDetails.
     */
    skip?: number
    distinct?: NurseDetailScalarFieldEnum | NurseDetailScalarFieldEnum[]
  }

  /**
   * NurseDetail create
   */
  export type NurseDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a NurseDetail.
     */
    data: XOR<NurseDetailCreateInput, NurseDetailUncheckedCreateInput>
  }

  /**
   * NurseDetail createMany
   */
  export type NurseDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NurseDetails.
     */
    data: NurseDetailCreateManyInput | NurseDetailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NurseDetail createManyAndReturn
   */
  export type NurseDetailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * The data used to create many NurseDetails.
     */
    data: NurseDetailCreateManyInput | NurseDetailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NurseDetail update
   */
  export type NurseDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a NurseDetail.
     */
    data: XOR<NurseDetailUpdateInput, NurseDetailUncheckedUpdateInput>
    /**
     * Choose, which NurseDetail to update.
     */
    where: NurseDetailWhereUniqueInput
  }

  /**
   * NurseDetail updateMany
   */
  export type NurseDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NurseDetails.
     */
    data: XOR<NurseDetailUpdateManyMutationInput, NurseDetailUncheckedUpdateManyInput>
    /**
     * Filter which NurseDetails to update
     */
    where?: NurseDetailWhereInput
    /**
     * Limit how many NurseDetails to update.
     */
    limit?: number
  }

  /**
   * NurseDetail updateManyAndReturn
   */
  export type NurseDetailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * The data used to update NurseDetails.
     */
    data: XOR<NurseDetailUpdateManyMutationInput, NurseDetailUncheckedUpdateManyInput>
    /**
     * Filter which NurseDetails to update
     */
    where?: NurseDetailWhereInput
    /**
     * Limit how many NurseDetails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NurseDetail upsert
   */
  export type NurseDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the NurseDetail to update in case it exists.
     */
    where: NurseDetailWhereUniqueInput
    /**
     * In case the NurseDetail found by the `where` argument doesn't exist, create a new NurseDetail with this data.
     */
    create: XOR<NurseDetailCreateInput, NurseDetailUncheckedCreateInput>
    /**
     * In case the NurseDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NurseDetailUpdateInput, NurseDetailUncheckedUpdateInput>
  }

  /**
   * NurseDetail delete
   */
  export type NurseDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
    /**
     * Filter which NurseDetail to delete.
     */
    where: NurseDetailWhereUniqueInput
  }

  /**
   * NurseDetail deleteMany
   */
  export type NurseDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NurseDetails to delete
     */
    where?: NurseDetailWhereInput
    /**
     * Limit how many NurseDetails to delete.
     */
    limit?: number
  }

  /**
   * NurseDetail without action
   */
  export type NurseDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NurseDetail
     */
    select?: NurseDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NurseDetail
     */
    omit?: NurseDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NurseDetailInclude<ExtArgs> | null
  }


  /**
   * Model DailyActivity
   */

  export type AggregateDailyActivity = {
    _count: DailyActivityCountAggregateOutputType | null
    _min: DailyActivityMinAggregateOutputType | null
    _max: DailyActivityMaxAggregateOutputType | null
  }

  export type DailyActivityMinAggregateOutputType = {
    id: string | null
    nurseId: string | null
    date: Date | null
    shiftType: string | null
  }

  export type DailyActivityMaxAggregateOutputType = {
    id: string | null
    nurseId: string | null
    date: Date | null
    shiftType: string | null
  }

  export type DailyActivityCountAggregateOutputType = {
    id: number
    nurseId: number
    date: number
    shiftType: number
    _all: number
  }


  export type DailyActivityMinAggregateInputType = {
    id?: true
    nurseId?: true
    date?: true
    shiftType?: true
  }

  export type DailyActivityMaxAggregateInputType = {
    id?: true
    nurseId?: true
    date?: true
    shiftType?: true
  }

  export type DailyActivityCountAggregateInputType = {
    id?: true
    nurseId?: true
    date?: true
    shiftType?: true
    _all?: true
  }

  export type DailyActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyActivity to aggregate.
     */
    where?: DailyActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyActivities to fetch.
     */
    orderBy?: DailyActivityOrderByWithRelationInput | DailyActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyActivities
    **/
    _count?: true | DailyActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyActivityMaxAggregateInputType
  }

  export type GetDailyActivityAggregateType<T extends DailyActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyActivity[P]>
      : GetScalarType<T[P], AggregateDailyActivity[P]>
  }




  export type DailyActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyActivityWhereInput
    orderBy?: DailyActivityOrderByWithAggregationInput | DailyActivityOrderByWithAggregationInput[]
    by: DailyActivityScalarFieldEnum[] | DailyActivityScalarFieldEnum
    having?: DailyActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyActivityCountAggregateInputType | true
    _min?: DailyActivityMinAggregateInputType
    _max?: DailyActivityMaxAggregateInputType
  }

  export type DailyActivityGroupByOutputType = {
    id: string
    nurseId: string
    date: Date
    shiftType: string | null
    _count: DailyActivityCountAggregateOutputType | null
    _min: DailyActivityMinAggregateOutputType | null
    _max: DailyActivityMaxAggregateOutputType | null
  }

  type GetDailyActivityGroupByPayload<T extends DailyActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyActivityGroupByOutputType[P]>
            : GetScalarType<T[P], DailyActivityGroupByOutputType[P]>
        }
      >
    >


  export type DailyActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nurseId?: boolean
    date?: boolean
    shiftType?: boolean
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyActivity"]>

  export type DailyActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nurseId?: boolean
    date?: boolean
    shiftType?: boolean
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyActivity"]>

  export type DailyActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nurseId?: boolean
    date?: boolean
    shiftType?: boolean
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyActivity"]>

  export type DailyActivitySelectScalar = {
    id?: boolean
    nurseId?: boolean
    date?: boolean
    shiftType?: boolean
  }

  export type DailyActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nurseId" | "date" | "shiftType", ExtArgs["result"]["dailyActivity"]>
  export type DailyActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DailyActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DailyActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DailyActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyActivity"
    objects: {
      nurse: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nurseId: string
      date: Date
      shiftType: string | null
    }, ExtArgs["result"]["dailyActivity"]>
    composites: {}
  }

  type DailyActivityGetPayload<S extends boolean | null | undefined | DailyActivityDefaultArgs> = $Result.GetResult<Prisma.$DailyActivityPayload, S>

  type DailyActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyActivityCountAggregateInputType | true
    }

  export interface DailyActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyActivity'], meta: { name: 'DailyActivity' } }
    /**
     * Find zero or one DailyActivity that matches the filter.
     * @param {DailyActivityFindUniqueArgs} args - Arguments to find a DailyActivity
     * @example
     * // Get one DailyActivity
     * const dailyActivity = await prisma.dailyActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyActivityFindUniqueArgs>(args: SelectSubset<T, DailyActivityFindUniqueArgs<ExtArgs>>): Prisma__DailyActivityClient<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyActivity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyActivityFindUniqueOrThrowArgs} args - Arguments to find a DailyActivity
     * @example
     * // Get one DailyActivity
     * const dailyActivity = await prisma.dailyActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyActivityClient<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyActivityFindFirstArgs} args - Arguments to find a DailyActivity
     * @example
     * // Get one DailyActivity
     * const dailyActivity = await prisma.dailyActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyActivityFindFirstArgs>(args?: SelectSubset<T, DailyActivityFindFirstArgs<ExtArgs>>): Prisma__DailyActivityClient<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyActivityFindFirstOrThrowArgs} args - Arguments to find a DailyActivity
     * @example
     * // Get one DailyActivity
     * const dailyActivity = await prisma.dailyActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyActivityClient<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyActivities
     * const dailyActivities = await prisma.dailyActivity.findMany()
     * 
     * // Get first 10 DailyActivities
     * const dailyActivities = await prisma.dailyActivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyActivityWithIdOnly = await prisma.dailyActivity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyActivityFindManyArgs>(args?: SelectSubset<T, DailyActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyActivity.
     * @param {DailyActivityCreateArgs} args - Arguments to create a DailyActivity.
     * @example
     * // Create one DailyActivity
     * const DailyActivity = await prisma.dailyActivity.create({
     *   data: {
     *     // ... data to create a DailyActivity
     *   }
     * })
     * 
     */
    create<T extends DailyActivityCreateArgs>(args: SelectSubset<T, DailyActivityCreateArgs<ExtArgs>>): Prisma__DailyActivityClient<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyActivities.
     * @param {DailyActivityCreateManyArgs} args - Arguments to create many DailyActivities.
     * @example
     * // Create many DailyActivities
     * const dailyActivity = await prisma.dailyActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyActivityCreateManyArgs>(args?: SelectSubset<T, DailyActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyActivities and returns the data saved in the database.
     * @param {DailyActivityCreateManyAndReturnArgs} args - Arguments to create many DailyActivities.
     * @example
     * // Create many DailyActivities
     * const dailyActivity = await prisma.dailyActivity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyActivities and only return the `id`
     * const dailyActivityWithIdOnly = await prisma.dailyActivity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyActivity.
     * @param {DailyActivityDeleteArgs} args - Arguments to delete one DailyActivity.
     * @example
     * // Delete one DailyActivity
     * const DailyActivity = await prisma.dailyActivity.delete({
     *   where: {
     *     // ... filter to delete one DailyActivity
     *   }
     * })
     * 
     */
    delete<T extends DailyActivityDeleteArgs>(args: SelectSubset<T, DailyActivityDeleteArgs<ExtArgs>>): Prisma__DailyActivityClient<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyActivity.
     * @param {DailyActivityUpdateArgs} args - Arguments to update one DailyActivity.
     * @example
     * // Update one DailyActivity
     * const dailyActivity = await prisma.dailyActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyActivityUpdateArgs>(args: SelectSubset<T, DailyActivityUpdateArgs<ExtArgs>>): Prisma__DailyActivityClient<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyActivities.
     * @param {DailyActivityDeleteManyArgs} args - Arguments to filter DailyActivities to delete.
     * @example
     * // Delete a few DailyActivities
     * const { count } = await prisma.dailyActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyActivityDeleteManyArgs>(args?: SelectSubset<T, DailyActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyActivities
     * const dailyActivity = await prisma.dailyActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyActivityUpdateManyArgs>(args: SelectSubset<T, DailyActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyActivities and returns the data updated in the database.
     * @param {DailyActivityUpdateManyAndReturnArgs} args - Arguments to update many DailyActivities.
     * @example
     * // Update many DailyActivities
     * const dailyActivity = await prisma.dailyActivity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyActivities and only return the `id`
     * const dailyActivityWithIdOnly = await prisma.dailyActivity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailyActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyActivity.
     * @param {DailyActivityUpsertArgs} args - Arguments to update or create a DailyActivity.
     * @example
     * // Update or create a DailyActivity
     * const dailyActivity = await prisma.dailyActivity.upsert({
     *   create: {
     *     // ... data to create a DailyActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyActivity we want to update
     *   }
     * })
     */
    upsert<T extends DailyActivityUpsertArgs>(args: SelectSubset<T, DailyActivityUpsertArgs<ExtArgs>>): Prisma__DailyActivityClient<$Result.GetResult<Prisma.$DailyActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyActivityCountArgs} args - Arguments to filter DailyActivities to count.
     * @example
     * // Count the number of DailyActivities
     * const count = await prisma.dailyActivity.count({
     *   where: {
     *     // ... the filter for the DailyActivities we want to count
     *   }
     * })
    **/
    count<T extends DailyActivityCountArgs>(
      args?: Subset<T, DailyActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyActivityAggregateArgs>(args: Subset<T, DailyActivityAggregateArgs>): Prisma.PrismaPromise<GetDailyActivityAggregateType<T>>

    /**
     * Group by DailyActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyActivityGroupByArgs['orderBy'] }
        : { orderBy?: DailyActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyActivity model
   */
  readonly fields: DailyActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    nurse<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyActivity model
   */
  interface DailyActivityFieldRefs {
    readonly id: FieldRef<"DailyActivity", 'String'>
    readonly nurseId: FieldRef<"DailyActivity", 'String'>
    readonly date: FieldRef<"DailyActivity", 'DateTime'>
    readonly shiftType: FieldRef<"DailyActivity", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DailyActivity findUnique
   */
  export type DailyActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
    /**
     * Filter, which DailyActivity to fetch.
     */
    where: DailyActivityWhereUniqueInput
  }

  /**
   * DailyActivity findUniqueOrThrow
   */
  export type DailyActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
    /**
     * Filter, which DailyActivity to fetch.
     */
    where: DailyActivityWhereUniqueInput
  }

  /**
   * DailyActivity findFirst
   */
  export type DailyActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
    /**
     * Filter, which DailyActivity to fetch.
     */
    where?: DailyActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyActivities to fetch.
     */
    orderBy?: DailyActivityOrderByWithRelationInput | DailyActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyActivities.
     */
    cursor?: DailyActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyActivities.
     */
    distinct?: DailyActivityScalarFieldEnum | DailyActivityScalarFieldEnum[]
  }

  /**
   * DailyActivity findFirstOrThrow
   */
  export type DailyActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
    /**
     * Filter, which DailyActivity to fetch.
     */
    where?: DailyActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyActivities to fetch.
     */
    orderBy?: DailyActivityOrderByWithRelationInput | DailyActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyActivities.
     */
    cursor?: DailyActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyActivities.
     */
    distinct?: DailyActivityScalarFieldEnum | DailyActivityScalarFieldEnum[]
  }

  /**
   * DailyActivity findMany
   */
  export type DailyActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
    /**
     * Filter, which DailyActivities to fetch.
     */
    where?: DailyActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyActivities to fetch.
     */
    orderBy?: DailyActivityOrderByWithRelationInput | DailyActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyActivities.
     */
    cursor?: DailyActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyActivities.
     */
    skip?: number
    distinct?: DailyActivityScalarFieldEnum | DailyActivityScalarFieldEnum[]
  }

  /**
   * DailyActivity create
   */
  export type DailyActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyActivity.
     */
    data: XOR<DailyActivityCreateInput, DailyActivityUncheckedCreateInput>
  }

  /**
   * DailyActivity createMany
   */
  export type DailyActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyActivities.
     */
    data: DailyActivityCreateManyInput | DailyActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyActivity createManyAndReturn
   */
  export type DailyActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * The data used to create many DailyActivities.
     */
    data: DailyActivityCreateManyInput | DailyActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyActivity update
   */
  export type DailyActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyActivity.
     */
    data: XOR<DailyActivityUpdateInput, DailyActivityUncheckedUpdateInput>
    /**
     * Choose, which DailyActivity to update.
     */
    where: DailyActivityWhereUniqueInput
  }

  /**
   * DailyActivity updateMany
   */
  export type DailyActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyActivities.
     */
    data: XOR<DailyActivityUpdateManyMutationInput, DailyActivityUncheckedUpdateManyInput>
    /**
     * Filter which DailyActivities to update
     */
    where?: DailyActivityWhereInput
    /**
     * Limit how many DailyActivities to update.
     */
    limit?: number
  }

  /**
   * DailyActivity updateManyAndReturn
   */
  export type DailyActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * The data used to update DailyActivities.
     */
    data: XOR<DailyActivityUpdateManyMutationInput, DailyActivityUncheckedUpdateManyInput>
    /**
     * Filter which DailyActivities to update
     */
    where?: DailyActivityWhereInput
    /**
     * Limit how many DailyActivities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyActivity upsert
   */
  export type DailyActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyActivity to update in case it exists.
     */
    where: DailyActivityWhereUniqueInput
    /**
     * In case the DailyActivity found by the `where` argument doesn't exist, create a new DailyActivity with this data.
     */
    create: XOR<DailyActivityCreateInput, DailyActivityUncheckedCreateInput>
    /**
     * In case the DailyActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyActivityUpdateInput, DailyActivityUncheckedUpdateInput>
  }

  /**
   * DailyActivity delete
   */
  export type DailyActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
    /**
     * Filter which DailyActivity to delete.
     */
    where: DailyActivityWhereUniqueInput
  }

  /**
   * DailyActivity deleteMany
   */
  export type DailyActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyActivities to delete
     */
    where?: DailyActivityWhereInput
    /**
     * Limit how many DailyActivities to delete.
     */
    limit?: number
  }

  /**
   * DailyActivity without action
   */
  export type DailyActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyActivity
     */
    select?: DailyActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyActivity
     */
    omit?: DailyActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyActivityInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientAvgAggregateOutputType = {
    bedNumber: number | null
    bradenQ: number | null
  }

  export type PatientSumAggregateOutputType = {
    bedNumber: number | null
    bradenQ: number | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    name: string | null
    nik: string | null
    birthDate: Date | null
    bedNumber: number | null
    gender: $Enums.Gender | null
    bradenQ: number | null
    status: $Enums.Status | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    nik: string | null
    birthDate: Date | null
    bedNumber: number | null
    gender: $Enums.Gender | null
    bradenQ: number | null
    status: $Enums.Status | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    name: number
    nik: number
    birthDate: number
    bedNumber: number
    gender: number
    bradenQ: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatientAvgAggregateInputType = {
    bedNumber?: true
    bradenQ?: true
  }

  export type PatientSumAggregateInputType = {
    bedNumber?: true
    bradenQ?: true
  }

  export type PatientMinAggregateInputType = {
    id?: true
    name?: true
    nik?: true
    birthDate?: true
    bedNumber?: true
    gender?: true
    bradenQ?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    name?: true
    nik?: true
    birthDate?: true
    bedNumber?: true
    gender?: true
    bradenQ?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    name?: true
    nik?: true
    birthDate?: true
    bedNumber?: true
    gender?: true
    bradenQ?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _avg?: PatientAvgAggregateInputType
    _sum?: PatientSumAggregateInputType
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    name: string
    nik: string
    birthDate: Date
    bedNumber: number
    gender: $Enums.Gender
    bradenQ: number
    status: $Enums.Status
    createdAt: Date
    updatedAt: Date
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nik?: boolean
    birthDate?: boolean
    bedNumber?: boolean
    gender?: boolean
    bradenQ?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reposisi?: boolean | Patient$reposisiArgs<ExtArgs>
    PatientHandle?: boolean | Patient$PatientHandleArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nik?: boolean
    birthDate?: boolean
    bedNumber?: boolean
    gender?: boolean
    bradenQ?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nik?: boolean
    birthDate?: boolean
    bedNumber?: boolean
    gender?: boolean
    bradenQ?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    name?: boolean
    nik?: boolean
    birthDate?: boolean
    bedNumber?: boolean
    gender?: boolean
    bradenQ?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "nik" | "birthDate" | "bedNumber" | "gender" | "bradenQ" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["patient"]>
  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reposisi?: boolean | Patient$reposisiArgs<ExtArgs>
    PatientHandle?: boolean | Patient$PatientHandleArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PatientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      reposisi: Prisma.$ReposisiHistoryPayload<ExtArgs>[]
      PatientHandle: Prisma.$PatientHandlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      nik: string
      birthDate: Date
      bedNumber: number
      gender: $Enums.Gender
      bradenQ: number
      status: $Enums.Status
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reposisi<T extends Patient$reposisiArgs<ExtArgs> = {}>(args?: Subset<T, Patient$reposisiArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    PatientHandle<T extends Patient$PatientHandleArgs<ExtArgs> = {}>(args?: Subset<T, Patient$PatientHandleArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly name: FieldRef<"Patient", 'String'>
    readonly nik: FieldRef<"Patient", 'String'>
    readonly birthDate: FieldRef<"Patient", 'DateTime'>
    readonly bedNumber: FieldRef<"Patient", 'Int'>
    readonly gender: FieldRef<"Patient", 'Gender'>
    readonly bradenQ: FieldRef<"Patient", 'Int'>
    readonly status: FieldRef<"Patient", 'Status'>
    readonly createdAt: FieldRef<"Patient", 'DateTime'>
    readonly updatedAt: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient updateManyAndReturn
   */
  export type PatientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to delete.
     */
    limit?: number
  }

  /**
   * Patient.reposisi
   */
  export type Patient$reposisiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    where?: ReposisiHistoryWhereInput
    orderBy?: ReposisiHistoryOrderByWithRelationInput | ReposisiHistoryOrderByWithRelationInput[]
    cursor?: ReposisiHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReposisiHistoryScalarFieldEnum | ReposisiHistoryScalarFieldEnum[]
  }

  /**
   * Patient.PatientHandle
   */
  export type Patient$PatientHandleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    where?: PatientHandleWhereInput
    orderBy?: PatientHandleOrderByWithRelationInput | PatientHandleOrderByWithRelationInput[]
    cursor?: PatientHandleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientHandleScalarFieldEnum | PatientHandleScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model ReposisiHistory
   */

  export type AggregateReposisiHistory = {
    _count: ReposisiHistoryCountAggregateOutputType | null
    _avg: ReposisiHistoryAvgAggregateOutputType | null
    _sum: ReposisiHistorySumAggregateOutputType | null
    _min: ReposisiHistoryMinAggregateOutputType | null
    _max: ReposisiHistoryMaxAggregateOutputType | null
  }

  export type ReposisiHistoryAvgAggregateOutputType = {
    bradenQ: number | null
  }

  export type ReposisiHistorySumAggregateOutputType = {
    bradenQ: number | null
  }

  export type ReposisiHistoryMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    position: string | null
    nurseId: string | null
    bradenQ: number | null
    Time: Date | null
    foto: string | null
  }

  export type ReposisiHistoryMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    position: string | null
    nurseId: string | null
    bradenQ: number | null
    Time: Date | null
    foto: string | null
  }

  export type ReposisiHistoryCountAggregateOutputType = {
    id: number
    patientId: number
    position: number
    nurseId: number
    bradenQ: number
    Time: number
    foto: number
    _all: number
  }


  export type ReposisiHistoryAvgAggregateInputType = {
    bradenQ?: true
  }

  export type ReposisiHistorySumAggregateInputType = {
    bradenQ?: true
  }

  export type ReposisiHistoryMinAggregateInputType = {
    id?: true
    patientId?: true
    position?: true
    nurseId?: true
    bradenQ?: true
    Time?: true
    foto?: true
  }

  export type ReposisiHistoryMaxAggregateInputType = {
    id?: true
    patientId?: true
    position?: true
    nurseId?: true
    bradenQ?: true
    Time?: true
    foto?: true
  }

  export type ReposisiHistoryCountAggregateInputType = {
    id?: true
    patientId?: true
    position?: true
    nurseId?: true
    bradenQ?: true
    Time?: true
    foto?: true
    _all?: true
  }

  export type ReposisiHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReposisiHistory to aggregate.
     */
    where?: ReposisiHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReposisiHistories to fetch.
     */
    orderBy?: ReposisiHistoryOrderByWithRelationInput | ReposisiHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReposisiHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReposisiHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReposisiHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReposisiHistories
    **/
    _count?: true | ReposisiHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReposisiHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReposisiHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReposisiHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReposisiHistoryMaxAggregateInputType
  }

  export type GetReposisiHistoryAggregateType<T extends ReposisiHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateReposisiHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReposisiHistory[P]>
      : GetScalarType<T[P], AggregateReposisiHistory[P]>
  }




  export type ReposisiHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReposisiHistoryWhereInput
    orderBy?: ReposisiHistoryOrderByWithAggregationInput | ReposisiHistoryOrderByWithAggregationInput[]
    by: ReposisiHistoryScalarFieldEnum[] | ReposisiHistoryScalarFieldEnum
    having?: ReposisiHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReposisiHistoryCountAggregateInputType | true
    _avg?: ReposisiHistoryAvgAggregateInputType
    _sum?: ReposisiHistorySumAggregateInputType
    _min?: ReposisiHistoryMinAggregateInputType
    _max?: ReposisiHistoryMaxAggregateInputType
  }

  export type ReposisiHistoryGroupByOutputType = {
    id: string
    patientId: string
    position: string
    nurseId: string
    bradenQ: number
    Time: Date
    foto: string | null
    _count: ReposisiHistoryCountAggregateOutputType | null
    _avg: ReposisiHistoryAvgAggregateOutputType | null
    _sum: ReposisiHistorySumAggregateOutputType | null
    _min: ReposisiHistoryMinAggregateOutputType | null
    _max: ReposisiHistoryMaxAggregateOutputType | null
  }

  type GetReposisiHistoryGroupByPayload<T extends ReposisiHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReposisiHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReposisiHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReposisiHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], ReposisiHistoryGroupByOutputType[P]>
        }
      >
    >


  export type ReposisiHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    position?: boolean
    nurseId?: boolean
    bradenQ?: boolean
    Time?: boolean
    foto?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reposisiHistory"]>

  export type ReposisiHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    position?: boolean
    nurseId?: boolean
    bradenQ?: boolean
    Time?: boolean
    foto?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reposisiHistory"]>

  export type ReposisiHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    position?: boolean
    nurseId?: boolean
    bradenQ?: boolean
    Time?: boolean
    foto?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reposisiHistory"]>

  export type ReposisiHistorySelectScalar = {
    id?: boolean
    patientId?: boolean
    position?: boolean
    nurseId?: boolean
    bradenQ?: boolean
    Time?: boolean
    foto?: boolean
  }

  export type ReposisiHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "position" | "nurseId" | "bradenQ" | "Time" | "foto", ExtArgs["result"]["reposisiHistory"]>
  export type ReposisiHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReposisiHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReposisiHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReposisiHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReposisiHistory"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      nurse: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      position: string
      nurseId: string
      bradenQ: number
      Time: Date
      foto: string | null
    }, ExtArgs["result"]["reposisiHistory"]>
    composites: {}
  }

  type ReposisiHistoryGetPayload<S extends boolean | null | undefined | ReposisiHistoryDefaultArgs> = $Result.GetResult<Prisma.$ReposisiHistoryPayload, S>

  type ReposisiHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReposisiHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReposisiHistoryCountAggregateInputType | true
    }

  export interface ReposisiHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReposisiHistory'], meta: { name: 'ReposisiHistory' } }
    /**
     * Find zero or one ReposisiHistory that matches the filter.
     * @param {ReposisiHistoryFindUniqueArgs} args - Arguments to find a ReposisiHistory
     * @example
     * // Get one ReposisiHistory
     * const reposisiHistory = await prisma.reposisiHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReposisiHistoryFindUniqueArgs>(args: SelectSubset<T, ReposisiHistoryFindUniqueArgs<ExtArgs>>): Prisma__ReposisiHistoryClient<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReposisiHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReposisiHistoryFindUniqueOrThrowArgs} args - Arguments to find a ReposisiHistory
     * @example
     * // Get one ReposisiHistory
     * const reposisiHistory = await prisma.reposisiHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReposisiHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ReposisiHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReposisiHistoryClient<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReposisiHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReposisiHistoryFindFirstArgs} args - Arguments to find a ReposisiHistory
     * @example
     * // Get one ReposisiHistory
     * const reposisiHistory = await prisma.reposisiHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReposisiHistoryFindFirstArgs>(args?: SelectSubset<T, ReposisiHistoryFindFirstArgs<ExtArgs>>): Prisma__ReposisiHistoryClient<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReposisiHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReposisiHistoryFindFirstOrThrowArgs} args - Arguments to find a ReposisiHistory
     * @example
     * // Get one ReposisiHistory
     * const reposisiHistory = await prisma.reposisiHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReposisiHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ReposisiHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReposisiHistoryClient<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReposisiHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReposisiHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReposisiHistories
     * const reposisiHistories = await prisma.reposisiHistory.findMany()
     * 
     * // Get first 10 ReposisiHistories
     * const reposisiHistories = await prisma.reposisiHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reposisiHistoryWithIdOnly = await prisma.reposisiHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReposisiHistoryFindManyArgs>(args?: SelectSubset<T, ReposisiHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReposisiHistory.
     * @param {ReposisiHistoryCreateArgs} args - Arguments to create a ReposisiHistory.
     * @example
     * // Create one ReposisiHistory
     * const ReposisiHistory = await prisma.reposisiHistory.create({
     *   data: {
     *     // ... data to create a ReposisiHistory
     *   }
     * })
     * 
     */
    create<T extends ReposisiHistoryCreateArgs>(args: SelectSubset<T, ReposisiHistoryCreateArgs<ExtArgs>>): Prisma__ReposisiHistoryClient<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReposisiHistories.
     * @param {ReposisiHistoryCreateManyArgs} args - Arguments to create many ReposisiHistories.
     * @example
     * // Create many ReposisiHistories
     * const reposisiHistory = await prisma.reposisiHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReposisiHistoryCreateManyArgs>(args?: SelectSubset<T, ReposisiHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReposisiHistories and returns the data saved in the database.
     * @param {ReposisiHistoryCreateManyAndReturnArgs} args - Arguments to create many ReposisiHistories.
     * @example
     * // Create many ReposisiHistories
     * const reposisiHistory = await prisma.reposisiHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReposisiHistories and only return the `id`
     * const reposisiHistoryWithIdOnly = await prisma.reposisiHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReposisiHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ReposisiHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReposisiHistory.
     * @param {ReposisiHistoryDeleteArgs} args - Arguments to delete one ReposisiHistory.
     * @example
     * // Delete one ReposisiHistory
     * const ReposisiHistory = await prisma.reposisiHistory.delete({
     *   where: {
     *     // ... filter to delete one ReposisiHistory
     *   }
     * })
     * 
     */
    delete<T extends ReposisiHistoryDeleteArgs>(args: SelectSubset<T, ReposisiHistoryDeleteArgs<ExtArgs>>): Prisma__ReposisiHistoryClient<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReposisiHistory.
     * @param {ReposisiHistoryUpdateArgs} args - Arguments to update one ReposisiHistory.
     * @example
     * // Update one ReposisiHistory
     * const reposisiHistory = await prisma.reposisiHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReposisiHistoryUpdateArgs>(args: SelectSubset<T, ReposisiHistoryUpdateArgs<ExtArgs>>): Prisma__ReposisiHistoryClient<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReposisiHistories.
     * @param {ReposisiHistoryDeleteManyArgs} args - Arguments to filter ReposisiHistories to delete.
     * @example
     * // Delete a few ReposisiHistories
     * const { count } = await prisma.reposisiHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReposisiHistoryDeleteManyArgs>(args?: SelectSubset<T, ReposisiHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReposisiHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReposisiHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReposisiHistories
     * const reposisiHistory = await prisma.reposisiHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReposisiHistoryUpdateManyArgs>(args: SelectSubset<T, ReposisiHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReposisiHistories and returns the data updated in the database.
     * @param {ReposisiHistoryUpdateManyAndReturnArgs} args - Arguments to update many ReposisiHistories.
     * @example
     * // Update many ReposisiHistories
     * const reposisiHistory = await prisma.reposisiHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReposisiHistories and only return the `id`
     * const reposisiHistoryWithIdOnly = await prisma.reposisiHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReposisiHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ReposisiHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReposisiHistory.
     * @param {ReposisiHistoryUpsertArgs} args - Arguments to update or create a ReposisiHistory.
     * @example
     * // Update or create a ReposisiHistory
     * const reposisiHistory = await prisma.reposisiHistory.upsert({
     *   create: {
     *     // ... data to create a ReposisiHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReposisiHistory we want to update
     *   }
     * })
     */
    upsert<T extends ReposisiHistoryUpsertArgs>(args: SelectSubset<T, ReposisiHistoryUpsertArgs<ExtArgs>>): Prisma__ReposisiHistoryClient<$Result.GetResult<Prisma.$ReposisiHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReposisiHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReposisiHistoryCountArgs} args - Arguments to filter ReposisiHistories to count.
     * @example
     * // Count the number of ReposisiHistories
     * const count = await prisma.reposisiHistory.count({
     *   where: {
     *     // ... the filter for the ReposisiHistories we want to count
     *   }
     * })
    **/
    count<T extends ReposisiHistoryCountArgs>(
      args?: Subset<T, ReposisiHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReposisiHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReposisiHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReposisiHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReposisiHistoryAggregateArgs>(args: Subset<T, ReposisiHistoryAggregateArgs>): Prisma.PrismaPromise<GetReposisiHistoryAggregateType<T>>

    /**
     * Group by ReposisiHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReposisiHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReposisiHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReposisiHistoryGroupByArgs['orderBy'] }
        : { orderBy?: ReposisiHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReposisiHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReposisiHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReposisiHistory model
   */
  readonly fields: ReposisiHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReposisiHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReposisiHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    nurse<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReposisiHistory model
   */
  interface ReposisiHistoryFieldRefs {
    readonly id: FieldRef<"ReposisiHistory", 'String'>
    readonly patientId: FieldRef<"ReposisiHistory", 'String'>
    readonly position: FieldRef<"ReposisiHistory", 'String'>
    readonly nurseId: FieldRef<"ReposisiHistory", 'String'>
    readonly bradenQ: FieldRef<"ReposisiHistory", 'Int'>
    readonly Time: FieldRef<"ReposisiHistory", 'DateTime'>
    readonly foto: FieldRef<"ReposisiHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ReposisiHistory findUnique
   */
  export type ReposisiHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReposisiHistory to fetch.
     */
    where: ReposisiHistoryWhereUniqueInput
  }

  /**
   * ReposisiHistory findUniqueOrThrow
   */
  export type ReposisiHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReposisiHistory to fetch.
     */
    where: ReposisiHistoryWhereUniqueInput
  }

  /**
   * ReposisiHistory findFirst
   */
  export type ReposisiHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReposisiHistory to fetch.
     */
    where?: ReposisiHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReposisiHistories to fetch.
     */
    orderBy?: ReposisiHistoryOrderByWithRelationInput | ReposisiHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReposisiHistories.
     */
    cursor?: ReposisiHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReposisiHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReposisiHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReposisiHistories.
     */
    distinct?: ReposisiHistoryScalarFieldEnum | ReposisiHistoryScalarFieldEnum[]
  }

  /**
   * ReposisiHistory findFirstOrThrow
   */
  export type ReposisiHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReposisiHistory to fetch.
     */
    where?: ReposisiHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReposisiHistories to fetch.
     */
    orderBy?: ReposisiHistoryOrderByWithRelationInput | ReposisiHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReposisiHistories.
     */
    cursor?: ReposisiHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReposisiHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReposisiHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReposisiHistories.
     */
    distinct?: ReposisiHistoryScalarFieldEnum | ReposisiHistoryScalarFieldEnum[]
  }

  /**
   * ReposisiHistory findMany
   */
  export type ReposisiHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReposisiHistories to fetch.
     */
    where?: ReposisiHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReposisiHistories to fetch.
     */
    orderBy?: ReposisiHistoryOrderByWithRelationInput | ReposisiHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReposisiHistories.
     */
    cursor?: ReposisiHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReposisiHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReposisiHistories.
     */
    skip?: number
    distinct?: ReposisiHistoryScalarFieldEnum | ReposisiHistoryScalarFieldEnum[]
  }

  /**
   * ReposisiHistory create
   */
  export type ReposisiHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ReposisiHistory.
     */
    data: XOR<ReposisiHistoryCreateInput, ReposisiHistoryUncheckedCreateInput>
  }

  /**
   * ReposisiHistory createMany
   */
  export type ReposisiHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReposisiHistories.
     */
    data: ReposisiHistoryCreateManyInput | ReposisiHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReposisiHistory createManyAndReturn
   */
  export type ReposisiHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many ReposisiHistories.
     */
    data: ReposisiHistoryCreateManyInput | ReposisiHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReposisiHistory update
   */
  export type ReposisiHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ReposisiHistory.
     */
    data: XOR<ReposisiHistoryUpdateInput, ReposisiHistoryUncheckedUpdateInput>
    /**
     * Choose, which ReposisiHistory to update.
     */
    where: ReposisiHistoryWhereUniqueInput
  }

  /**
   * ReposisiHistory updateMany
   */
  export type ReposisiHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReposisiHistories.
     */
    data: XOR<ReposisiHistoryUpdateManyMutationInput, ReposisiHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ReposisiHistories to update
     */
    where?: ReposisiHistoryWhereInput
    /**
     * Limit how many ReposisiHistories to update.
     */
    limit?: number
  }

  /**
   * ReposisiHistory updateManyAndReturn
   */
  export type ReposisiHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * The data used to update ReposisiHistories.
     */
    data: XOR<ReposisiHistoryUpdateManyMutationInput, ReposisiHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ReposisiHistories to update
     */
    where?: ReposisiHistoryWhereInput
    /**
     * Limit how many ReposisiHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReposisiHistory upsert
   */
  export type ReposisiHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ReposisiHistory to update in case it exists.
     */
    where: ReposisiHistoryWhereUniqueInput
    /**
     * In case the ReposisiHistory found by the `where` argument doesn't exist, create a new ReposisiHistory with this data.
     */
    create: XOR<ReposisiHistoryCreateInput, ReposisiHistoryUncheckedCreateInput>
    /**
     * In case the ReposisiHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReposisiHistoryUpdateInput, ReposisiHistoryUncheckedUpdateInput>
  }

  /**
   * ReposisiHistory delete
   */
  export type ReposisiHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
    /**
     * Filter which ReposisiHistory to delete.
     */
    where: ReposisiHistoryWhereUniqueInput
  }

  /**
   * ReposisiHistory deleteMany
   */
  export type ReposisiHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReposisiHistories to delete
     */
    where?: ReposisiHistoryWhereInput
    /**
     * Limit how many ReposisiHistories to delete.
     */
    limit?: number
  }

  /**
   * ReposisiHistory without action
   */
  export type ReposisiHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReposisiHistory
     */
    select?: ReposisiHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReposisiHistory
     */
    omit?: ReposisiHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReposisiHistoryInclude<ExtArgs> | null
  }


  /**
   * Model PatientHandle
   */

  export type AggregatePatientHandle = {
    _count: PatientHandleCountAggregateOutputType | null
    _avg: PatientHandleAvgAggregateOutputType | null
    _sum: PatientHandleSumAggregateOutputType | null
    _min: PatientHandleMinAggregateOutputType | null
    _max: PatientHandleMaxAggregateOutputType | null
  }

  export type PatientHandleAvgAggregateOutputType = {
    bradenQ: number | null
  }

  export type PatientHandleSumAggregateOutputType = {
    bradenQ: number | null
  }

  export type PatientHandleMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    nurseId: string | null
    bradenQ: number | null
    foto: string | null
    status: $Enums.Status | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientHandleMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    nurseId: string | null
    bradenQ: number | null
    foto: string | null
    status: $Enums.Status | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientHandleCountAggregateOutputType = {
    id: number
    patientId: number
    nurseId: number
    bradenQ: number
    foto: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatientHandleAvgAggregateInputType = {
    bradenQ?: true
  }

  export type PatientHandleSumAggregateInputType = {
    bradenQ?: true
  }

  export type PatientHandleMinAggregateInputType = {
    id?: true
    patientId?: true
    nurseId?: true
    bradenQ?: true
    foto?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientHandleMaxAggregateInputType = {
    id?: true
    patientId?: true
    nurseId?: true
    bradenQ?: true
    foto?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientHandleCountAggregateInputType = {
    id?: true
    patientId?: true
    nurseId?: true
    bradenQ?: true
    foto?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatientHandleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientHandle to aggregate.
     */
    where?: PatientHandleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientHandles to fetch.
     */
    orderBy?: PatientHandleOrderByWithRelationInput | PatientHandleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientHandleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientHandles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientHandles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatientHandles
    **/
    _count?: true | PatientHandleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientHandleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientHandleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientHandleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientHandleMaxAggregateInputType
  }

  export type GetPatientHandleAggregateType<T extends PatientHandleAggregateArgs> = {
        [P in keyof T & keyof AggregatePatientHandle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatientHandle[P]>
      : GetScalarType<T[P], AggregatePatientHandle[P]>
  }




  export type PatientHandleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientHandleWhereInput
    orderBy?: PatientHandleOrderByWithAggregationInput | PatientHandleOrderByWithAggregationInput[]
    by: PatientHandleScalarFieldEnum[] | PatientHandleScalarFieldEnum
    having?: PatientHandleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientHandleCountAggregateInputType | true
    _avg?: PatientHandleAvgAggregateInputType
    _sum?: PatientHandleSumAggregateInputType
    _min?: PatientHandleMinAggregateInputType
    _max?: PatientHandleMaxAggregateInputType
  }

  export type PatientHandleGroupByOutputType = {
    id: string
    patientId: string
    nurseId: string
    bradenQ: number
    foto: string | null
    status: $Enums.Status
    createdAt: Date
    updatedAt: Date
    _count: PatientHandleCountAggregateOutputType | null
    _avg: PatientHandleAvgAggregateOutputType | null
    _sum: PatientHandleSumAggregateOutputType | null
    _min: PatientHandleMinAggregateOutputType | null
    _max: PatientHandleMaxAggregateOutputType | null
  }

  type GetPatientHandleGroupByPayload<T extends PatientHandleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientHandleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientHandleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientHandleGroupByOutputType[P]>
            : GetScalarType<T[P], PatientHandleGroupByOutputType[P]>
        }
      >
    >


  export type PatientHandleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    nurseId?: boolean
    bradenQ?: boolean
    foto?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientHandle"]>

  export type PatientHandleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    nurseId?: boolean
    bradenQ?: boolean
    foto?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientHandle"]>

  export type PatientHandleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    nurseId?: boolean
    bradenQ?: boolean
    foto?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientHandle"]>

  export type PatientHandleSelectScalar = {
    id?: boolean
    patientId?: boolean
    nurseId?: boolean
    bradenQ?: boolean
    foto?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PatientHandleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "nurseId" | "bradenQ" | "foto" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["patientHandle"]>
  export type PatientHandleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PatientHandleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PatientHandleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    nurse?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PatientHandlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatientHandle"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      nurse: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      nurseId: string
      bradenQ: number
      foto: string | null
      status: $Enums.Status
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["patientHandle"]>
    composites: {}
  }

  type PatientHandleGetPayload<S extends boolean | null | undefined | PatientHandleDefaultArgs> = $Result.GetResult<Prisma.$PatientHandlePayload, S>

  type PatientHandleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientHandleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientHandleCountAggregateInputType | true
    }

  export interface PatientHandleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatientHandle'], meta: { name: 'PatientHandle' } }
    /**
     * Find zero or one PatientHandle that matches the filter.
     * @param {PatientHandleFindUniqueArgs} args - Arguments to find a PatientHandle
     * @example
     * // Get one PatientHandle
     * const patientHandle = await prisma.patientHandle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientHandleFindUniqueArgs>(args: SelectSubset<T, PatientHandleFindUniqueArgs<ExtArgs>>): Prisma__PatientHandleClient<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PatientHandle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientHandleFindUniqueOrThrowArgs} args - Arguments to find a PatientHandle
     * @example
     * // Get one PatientHandle
     * const patientHandle = await prisma.patientHandle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientHandleFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientHandleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientHandleClient<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientHandle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientHandleFindFirstArgs} args - Arguments to find a PatientHandle
     * @example
     * // Get one PatientHandle
     * const patientHandle = await prisma.patientHandle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientHandleFindFirstArgs>(args?: SelectSubset<T, PatientHandleFindFirstArgs<ExtArgs>>): Prisma__PatientHandleClient<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientHandle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientHandleFindFirstOrThrowArgs} args - Arguments to find a PatientHandle
     * @example
     * // Get one PatientHandle
     * const patientHandle = await prisma.patientHandle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientHandleFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientHandleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientHandleClient<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PatientHandles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientHandleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientHandles
     * const patientHandles = await prisma.patientHandle.findMany()
     * 
     * // Get first 10 PatientHandles
     * const patientHandles = await prisma.patientHandle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientHandleWithIdOnly = await prisma.patientHandle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientHandleFindManyArgs>(args?: SelectSubset<T, PatientHandleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PatientHandle.
     * @param {PatientHandleCreateArgs} args - Arguments to create a PatientHandle.
     * @example
     * // Create one PatientHandle
     * const PatientHandle = await prisma.patientHandle.create({
     *   data: {
     *     // ... data to create a PatientHandle
     *   }
     * })
     * 
     */
    create<T extends PatientHandleCreateArgs>(args: SelectSubset<T, PatientHandleCreateArgs<ExtArgs>>): Prisma__PatientHandleClient<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PatientHandles.
     * @param {PatientHandleCreateManyArgs} args - Arguments to create many PatientHandles.
     * @example
     * // Create many PatientHandles
     * const patientHandle = await prisma.patientHandle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientHandleCreateManyArgs>(args?: SelectSubset<T, PatientHandleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatientHandles and returns the data saved in the database.
     * @param {PatientHandleCreateManyAndReturnArgs} args - Arguments to create many PatientHandles.
     * @example
     * // Create many PatientHandles
     * const patientHandle = await prisma.patientHandle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatientHandles and only return the `id`
     * const patientHandleWithIdOnly = await prisma.patientHandle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientHandleCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientHandleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PatientHandle.
     * @param {PatientHandleDeleteArgs} args - Arguments to delete one PatientHandle.
     * @example
     * // Delete one PatientHandle
     * const PatientHandle = await prisma.patientHandle.delete({
     *   where: {
     *     // ... filter to delete one PatientHandle
     *   }
     * })
     * 
     */
    delete<T extends PatientHandleDeleteArgs>(args: SelectSubset<T, PatientHandleDeleteArgs<ExtArgs>>): Prisma__PatientHandleClient<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PatientHandle.
     * @param {PatientHandleUpdateArgs} args - Arguments to update one PatientHandle.
     * @example
     * // Update one PatientHandle
     * const patientHandle = await prisma.patientHandle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientHandleUpdateArgs>(args: SelectSubset<T, PatientHandleUpdateArgs<ExtArgs>>): Prisma__PatientHandleClient<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PatientHandles.
     * @param {PatientHandleDeleteManyArgs} args - Arguments to filter PatientHandles to delete.
     * @example
     * // Delete a few PatientHandles
     * const { count } = await prisma.patientHandle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientHandleDeleteManyArgs>(args?: SelectSubset<T, PatientHandleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientHandles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientHandleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientHandles
     * const patientHandle = await prisma.patientHandle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientHandleUpdateManyArgs>(args: SelectSubset<T, PatientHandleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientHandles and returns the data updated in the database.
     * @param {PatientHandleUpdateManyAndReturnArgs} args - Arguments to update many PatientHandles.
     * @example
     * // Update many PatientHandles
     * const patientHandle = await prisma.patientHandle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatientHandles and only return the `id`
     * const patientHandleWithIdOnly = await prisma.patientHandle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientHandleUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientHandleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PatientHandle.
     * @param {PatientHandleUpsertArgs} args - Arguments to update or create a PatientHandle.
     * @example
     * // Update or create a PatientHandle
     * const patientHandle = await prisma.patientHandle.upsert({
     *   create: {
     *     // ... data to create a PatientHandle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientHandle we want to update
     *   }
     * })
     */
    upsert<T extends PatientHandleUpsertArgs>(args: SelectSubset<T, PatientHandleUpsertArgs<ExtArgs>>): Prisma__PatientHandleClient<$Result.GetResult<Prisma.$PatientHandlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PatientHandles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientHandleCountArgs} args - Arguments to filter PatientHandles to count.
     * @example
     * // Count the number of PatientHandles
     * const count = await prisma.patientHandle.count({
     *   where: {
     *     // ... the filter for the PatientHandles we want to count
     *   }
     * })
    **/
    count<T extends PatientHandleCountArgs>(
      args?: Subset<T, PatientHandleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientHandleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatientHandle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientHandleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientHandleAggregateArgs>(args: Subset<T, PatientHandleAggregateArgs>): Prisma.PrismaPromise<GetPatientHandleAggregateType<T>>

    /**
     * Group by PatientHandle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientHandleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientHandleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientHandleGroupByArgs['orderBy'] }
        : { orderBy?: PatientHandleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientHandleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientHandleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatientHandle model
   */
  readonly fields: PatientHandleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatientHandle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientHandleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    nurse<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatientHandle model
   */
  interface PatientHandleFieldRefs {
    readonly id: FieldRef<"PatientHandle", 'String'>
    readonly patientId: FieldRef<"PatientHandle", 'String'>
    readonly nurseId: FieldRef<"PatientHandle", 'String'>
    readonly bradenQ: FieldRef<"PatientHandle", 'Int'>
    readonly foto: FieldRef<"PatientHandle", 'String'>
    readonly status: FieldRef<"PatientHandle", 'Status'>
    readonly createdAt: FieldRef<"PatientHandle", 'DateTime'>
    readonly updatedAt: FieldRef<"PatientHandle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PatientHandle findUnique
   */
  export type PatientHandleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    /**
     * Filter, which PatientHandle to fetch.
     */
    where: PatientHandleWhereUniqueInput
  }

  /**
   * PatientHandle findUniqueOrThrow
   */
  export type PatientHandleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    /**
     * Filter, which PatientHandle to fetch.
     */
    where: PatientHandleWhereUniqueInput
  }

  /**
   * PatientHandle findFirst
   */
  export type PatientHandleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    /**
     * Filter, which PatientHandle to fetch.
     */
    where?: PatientHandleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientHandles to fetch.
     */
    orderBy?: PatientHandleOrderByWithRelationInput | PatientHandleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientHandles.
     */
    cursor?: PatientHandleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientHandles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientHandles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientHandles.
     */
    distinct?: PatientHandleScalarFieldEnum | PatientHandleScalarFieldEnum[]
  }

  /**
   * PatientHandle findFirstOrThrow
   */
  export type PatientHandleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    /**
     * Filter, which PatientHandle to fetch.
     */
    where?: PatientHandleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientHandles to fetch.
     */
    orderBy?: PatientHandleOrderByWithRelationInput | PatientHandleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientHandles.
     */
    cursor?: PatientHandleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientHandles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientHandles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientHandles.
     */
    distinct?: PatientHandleScalarFieldEnum | PatientHandleScalarFieldEnum[]
  }

  /**
   * PatientHandle findMany
   */
  export type PatientHandleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    /**
     * Filter, which PatientHandles to fetch.
     */
    where?: PatientHandleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientHandles to fetch.
     */
    orderBy?: PatientHandleOrderByWithRelationInput | PatientHandleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatientHandles.
     */
    cursor?: PatientHandleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientHandles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientHandles.
     */
    skip?: number
    distinct?: PatientHandleScalarFieldEnum | PatientHandleScalarFieldEnum[]
  }

  /**
   * PatientHandle create
   */
  export type PatientHandleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    /**
     * The data needed to create a PatientHandle.
     */
    data: XOR<PatientHandleCreateInput, PatientHandleUncheckedCreateInput>
  }

  /**
   * PatientHandle createMany
   */
  export type PatientHandleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientHandles.
     */
    data: PatientHandleCreateManyInput | PatientHandleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatientHandle createManyAndReturn
   */
  export type PatientHandleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * The data used to create many PatientHandles.
     */
    data: PatientHandleCreateManyInput | PatientHandleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientHandle update
   */
  export type PatientHandleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    /**
     * The data needed to update a PatientHandle.
     */
    data: XOR<PatientHandleUpdateInput, PatientHandleUncheckedUpdateInput>
    /**
     * Choose, which PatientHandle to update.
     */
    where: PatientHandleWhereUniqueInput
  }

  /**
   * PatientHandle updateMany
   */
  export type PatientHandleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientHandles.
     */
    data: XOR<PatientHandleUpdateManyMutationInput, PatientHandleUncheckedUpdateManyInput>
    /**
     * Filter which PatientHandles to update
     */
    where?: PatientHandleWhereInput
    /**
     * Limit how many PatientHandles to update.
     */
    limit?: number
  }

  /**
   * PatientHandle updateManyAndReturn
   */
  export type PatientHandleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * The data used to update PatientHandles.
     */
    data: XOR<PatientHandleUpdateManyMutationInput, PatientHandleUncheckedUpdateManyInput>
    /**
     * Filter which PatientHandles to update
     */
    where?: PatientHandleWhereInput
    /**
     * Limit how many PatientHandles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientHandle upsert
   */
  export type PatientHandleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    /**
     * The filter to search for the PatientHandle to update in case it exists.
     */
    where: PatientHandleWhereUniqueInput
    /**
     * In case the PatientHandle found by the `where` argument doesn't exist, create a new PatientHandle with this data.
     */
    create: XOR<PatientHandleCreateInput, PatientHandleUncheckedCreateInput>
    /**
     * In case the PatientHandle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientHandleUpdateInput, PatientHandleUncheckedUpdateInput>
  }

  /**
   * PatientHandle delete
   */
  export type PatientHandleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
    /**
     * Filter which PatientHandle to delete.
     */
    where: PatientHandleWhereUniqueInput
  }

  /**
   * PatientHandle deleteMany
   */
  export type PatientHandleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientHandles to delete
     */
    where?: PatientHandleWhereInput
    /**
     * Limit how many PatientHandles to delete.
     */
    limit?: number
  }

  /**
   * PatientHandle without action
   */
  export type PatientHandleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientHandle
     */
    select?: PatientHandleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientHandle
     */
    omit?: PatientHandleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientHandleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    role: 'role',
    name: 'name',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const NurseDetailScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    phone: 'phone',
    address: 'address',
    nurseStatus: 'nurseStatus'
  };

  export type NurseDetailScalarFieldEnum = (typeof NurseDetailScalarFieldEnum)[keyof typeof NurseDetailScalarFieldEnum]


  export const DailyActivityScalarFieldEnum: {
    id: 'id',
    nurseId: 'nurseId',
    date: 'date',
    shiftType: 'shiftType'
  };

  export type DailyActivityScalarFieldEnum = (typeof DailyActivityScalarFieldEnum)[keyof typeof DailyActivityScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    nik: 'nik',
    birthDate: 'birthDate',
    bedNumber: 'bedNumber',
    gender: 'gender',
    bradenQ: 'bradenQ',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const ReposisiHistoryScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    position: 'position',
    nurseId: 'nurseId',
    bradenQ: 'bradenQ',
    Time: 'Time',
    foto: 'foto'
  };

  export type ReposisiHistoryScalarFieldEnum = (typeof ReposisiHistoryScalarFieldEnum)[keyof typeof ReposisiHistoryScalarFieldEnum]


  export const PatientHandleScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    nurseId: 'nurseId',
    bradenQ: 'bradenQ',
    foto: 'foto',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatientHandleScalarFieldEnum = (typeof PatientHandleScalarFieldEnum)[keyof typeof PatientHandleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'NurseStatus'
   */
  export type EnumNurseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NurseStatus'>
    


  /**
   * Reference to a field of type 'NurseStatus[]'
   */
  export type ListEnumNurseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NurseStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    reposisiHistory?: ReposisiHistoryListRelationFilter
    nurseDetail?: NurseDetailListRelationFilter
    DailyActivity?: DailyActivityListRelationFilter
    PatientHandle?: PatientHandleListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reposisiHistory?: ReposisiHistoryOrderByRelationAggregateInput
    nurseDetail?: NurseDetailOrderByRelationAggregateInput
    DailyActivity?: DailyActivityOrderByRelationAggregateInput
    PatientHandle?: PatientHandleOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    reposisiHistory?: ReposisiHistoryListRelationFilter
    nurseDetail?: NurseDetailListRelationFilter
    DailyActivity?: DailyActivityListRelationFilter
    PatientHandle?: PatientHandleListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type NurseDetailWhereInput = {
    AND?: NurseDetailWhereInput | NurseDetailWhereInput[]
    OR?: NurseDetailWhereInput[]
    NOT?: NurseDetailWhereInput | NurseDetailWhereInput[]
    id?: StringFilter<"NurseDetail"> | string
    userId?: StringFilter<"NurseDetail"> | string
    phone?: StringFilter<"NurseDetail"> | string
    address?: StringFilter<"NurseDetail"> | string
    nurseStatus?: EnumNurseStatusFilter<"NurseDetail"> | $Enums.NurseStatus
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NurseDetailOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    nurseStatus?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NurseDetailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: NurseDetailWhereInput | NurseDetailWhereInput[]
    OR?: NurseDetailWhereInput[]
    NOT?: NurseDetailWhereInput | NurseDetailWhereInput[]
    phone?: StringFilter<"NurseDetail"> | string
    address?: StringFilter<"NurseDetail"> | string
    nurseStatus?: EnumNurseStatusFilter<"NurseDetail"> | $Enums.NurseStatus
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type NurseDetailOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    nurseStatus?: SortOrder
    _count?: NurseDetailCountOrderByAggregateInput
    _max?: NurseDetailMaxOrderByAggregateInput
    _min?: NurseDetailMinOrderByAggregateInput
  }

  export type NurseDetailScalarWhereWithAggregatesInput = {
    AND?: NurseDetailScalarWhereWithAggregatesInput | NurseDetailScalarWhereWithAggregatesInput[]
    OR?: NurseDetailScalarWhereWithAggregatesInput[]
    NOT?: NurseDetailScalarWhereWithAggregatesInput | NurseDetailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NurseDetail"> | string
    userId?: StringWithAggregatesFilter<"NurseDetail"> | string
    phone?: StringWithAggregatesFilter<"NurseDetail"> | string
    address?: StringWithAggregatesFilter<"NurseDetail"> | string
    nurseStatus?: EnumNurseStatusWithAggregatesFilter<"NurseDetail"> | $Enums.NurseStatus
  }

  export type DailyActivityWhereInput = {
    AND?: DailyActivityWhereInput | DailyActivityWhereInput[]
    OR?: DailyActivityWhereInput[]
    NOT?: DailyActivityWhereInput | DailyActivityWhereInput[]
    id?: StringFilter<"DailyActivity"> | string
    nurseId?: StringFilter<"DailyActivity"> | string
    date?: DateTimeFilter<"DailyActivity"> | Date | string
    shiftType?: StringNullableFilter<"DailyActivity"> | string | null
    nurse?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DailyActivityOrderByWithRelationInput = {
    id?: SortOrder
    nurseId?: SortOrder
    date?: SortOrder
    shiftType?: SortOrderInput | SortOrder
    nurse?: UserOrderByWithRelationInput
  }

  export type DailyActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nurseId_date?: DailyActivityNurseIdDateCompoundUniqueInput
    AND?: DailyActivityWhereInput | DailyActivityWhereInput[]
    OR?: DailyActivityWhereInput[]
    NOT?: DailyActivityWhereInput | DailyActivityWhereInput[]
    nurseId?: StringFilter<"DailyActivity"> | string
    date?: DateTimeFilter<"DailyActivity"> | Date | string
    shiftType?: StringNullableFilter<"DailyActivity"> | string | null
    nurse?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "nurseId_date">

  export type DailyActivityOrderByWithAggregationInput = {
    id?: SortOrder
    nurseId?: SortOrder
    date?: SortOrder
    shiftType?: SortOrderInput | SortOrder
    _count?: DailyActivityCountOrderByAggregateInput
    _max?: DailyActivityMaxOrderByAggregateInput
    _min?: DailyActivityMinOrderByAggregateInput
  }

  export type DailyActivityScalarWhereWithAggregatesInput = {
    AND?: DailyActivityScalarWhereWithAggregatesInput | DailyActivityScalarWhereWithAggregatesInput[]
    OR?: DailyActivityScalarWhereWithAggregatesInput[]
    NOT?: DailyActivityScalarWhereWithAggregatesInput | DailyActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyActivity"> | string
    nurseId?: StringWithAggregatesFilter<"DailyActivity"> | string
    date?: DateTimeWithAggregatesFilter<"DailyActivity"> | Date | string
    shiftType?: StringNullableWithAggregatesFilter<"DailyActivity"> | string | null
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    name?: StringFilter<"Patient"> | string
    nik?: StringFilter<"Patient"> | string
    birthDate?: DateTimeFilter<"Patient"> | Date | string
    bedNumber?: IntFilter<"Patient"> | number
    gender?: EnumGenderFilter<"Patient"> | $Enums.Gender
    bradenQ?: IntFilter<"Patient"> | number
    status?: EnumStatusFilter<"Patient"> | $Enums.Status
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    reposisi?: ReposisiHistoryListRelationFilter
    PatientHandle?: PatientHandleListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    nik?: SortOrder
    birthDate?: SortOrder
    bedNumber?: SortOrder
    gender?: SortOrder
    bradenQ?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reposisi?: ReposisiHistoryOrderByRelationAggregateInput
    PatientHandle?: PatientHandleOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nik?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    name?: StringFilter<"Patient"> | string
    birthDate?: DateTimeFilter<"Patient"> | Date | string
    bedNumber?: IntFilter<"Patient"> | number
    gender?: EnumGenderFilter<"Patient"> | $Enums.Gender
    bradenQ?: IntFilter<"Patient"> | number
    status?: EnumStatusFilter<"Patient"> | $Enums.Status
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    reposisi?: ReposisiHistoryListRelationFilter
    PatientHandle?: PatientHandleListRelationFilter
  }, "id" | "nik">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    nik?: SortOrder
    birthDate?: SortOrder
    bedNumber?: SortOrder
    gender?: SortOrder
    bradenQ?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _avg?: PatientAvgOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
    _sum?: PatientSumOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    name?: StringWithAggregatesFilter<"Patient"> | string
    nik?: StringWithAggregatesFilter<"Patient"> | string
    birthDate?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    bedNumber?: IntWithAggregatesFilter<"Patient"> | number
    gender?: EnumGenderWithAggregatesFilter<"Patient"> | $Enums.Gender
    bradenQ?: IntWithAggregatesFilter<"Patient"> | number
    status?: EnumStatusWithAggregatesFilter<"Patient"> | $Enums.Status
    createdAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
  }

  export type ReposisiHistoryWhereInput = {
    AND?: ReposisiHistoryWhereInput | ReposisiHistoryWhereInput[]
    OR?: ReposisiHistoryWhereInput[]
    NOT?: ReposisiHistoryWhereInput | ReposisiHistoryWhereInput[]
    id?: StringFilter<"ReposisiHistory"> | string
    patientId?: StringFilter<"ReposisiHistory"> | string
    position?: StringFilter<"ReposisiHistory"> | string
    nurseId?: StringFilter<"ReposisiHistory"> | string
    bradenQ?: IntFilter<"ReposisiHistory"> | number
    Time?: DateTimeFilter<"ReposisiHistory"> | Date | string
    foto?: StringNullableFilter<"ReposisiHistory"> | string | null
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    nurse?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReposisiHistoryOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    position?: SortOrder
    nurseId?: SortOrder
    bradenQ?: SortOrder
    Time?: SortOrder
    foto?: SortOrderInput | SortOrder
    patient?: PatientOrderByWithRelationInput
    nurse?: UserOrderByWithRelationInput
  }

  export type ReposisiHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReposisiHistoryWhereInput | ReposisiHistoryWhereInput[]
    OR?: ReposisiHistoryWhereInput[]
    NOT?: ReposisiHistoryWhereInput | ReposisiHistoryWhereInput[]
    patientId?: StringFilter<"ReposisiHistory"> | string
    position?: StringFilter<"ReposisiHistory"> | string
    nurseId?: StringFilter<"ReposisiHistory"> | string
    bradenQ?: IntFilter<"ReposisiHistory"> | number
    Time?: DateTimeFilter<"ReposisiHistory"> | Date | string
    foto?: StringNullableFilter<"ReposisiHistory"> | string | null
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    nurse?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ReposisiHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    position?: SortOrder
    nurseId?: SortOrder
    bradenQ?: SortOrder
    Time?: SortOrder
    foto?: SortOrderInput | SortOrder
    _count?: ReposisiHistoryCountOrderByAggregateInput
    _avg?: ReposisiHistoryAvgOrderByAggregateInput
    _max?: ReposisiHistoryMaxOrderByAggregateInput
    _min?: ReposisiHistoryMinOrderByAggregateInput
    _sum?: ReposisiHistorySumOrderByAggregateInput
  }

  export type ReposisiHistoryScalarWhereWithAggregatesInput = {
    AND?: ReposisiHistoryScalarWhereWithAggregatesInput | ReposisiHistoryScalarWhereWithAggregatesInput[]
    OR?: ReposisiHistoryScalarWhereWithAggregatesInput[]
    NOT?: ReposisiHistoryScalarWhereWithAggregatesInput | ReposisiHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReposisiHistory"> | string
    patientId?: StringWithAggregatesFilter<"ReposisiHistory"> | string
    position?: StringWithAggregatesFilter<"ReposisiHistory"> | string
    nurseId?: StringWithAggregatesFilter<"ReposisiHistory"> | string
    bradenQ?: IntWithAggregatesFilter<"ReposisiHistory"> | number
    Time?: DateTimeWithAggregatesFilter<"ReposisiHistory"> | Date | string
    foto?: StringNullableWithAggregatesFilter<"ReposisiHistory"> | string | null
  }

  export type PatientHandleWhereInput = {
    AND?: PatientHandleWhereInput | PatientHandleWhereInput[]
    OR?: PatientHandleWhereInput[]
    NOT?: PatientHandleWhereInput | PatientHandleWhereInput[]
    id?: StringFilter<"PatientHandle"> | string
    patientId?: StringFilter<"PatientHandle"> | string
    nurseId?: StringFilter<"PatientHandle"> | string
    bradenQ?: IntFilter<"PatientHandle"> | number
    foto?: StringNullableFilter<"PatientHandle"> | string | null
    status?: EnumStatusFilter<"PatientHandle"> | $Enums.Status
    createdAt?: DateTimeFilter<"PatientHandle"> | Date | string
    updatedAt?: DateTimeFilter<"PatientHandle"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    nurse?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PatientHandleOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    bradenQ?: SortOrder
    foto?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
    nurse?: UserOrderByWithRelationInput
  }

  export type PatientHandleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    patientId_nurseId?: PatientHandlePatientIdNurseIdCompoundUniqueInput
    AND?: PatientHandleWhereInput | PatientHandleWhereInput[]
    OR?: PatientHandleWhereInput[]
    NOT?: PatientHandleWhereInput | PatientHandleWhereInput[]
    patientId?: StringFilter<"PatientHandle"> | string
    nurseId?: StringFilter<"PatientHandle"> | string
    bradenQ?: IntFilter<"PatientHandle"> | number
    foto?: StringNullableFilter<"PatientHandle"> | string | null
    status?: EnumStatusFilter<"PatientHandle"> | $Enums.Status
    createdAt?: DateTimeFilter<"PatientHandle"> | Date | string
    updatedAt?: DateTimeFilter<"PatientHandle"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    nurse?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "patientId_nurseId">

  export type PatientHandleOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    bradenQ?: SortOrder
    foto?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatientHandleCountOrderByAggregateInput
    _avg?: PatientHandleAvgOrderByAggregateInput
    _max?: PatientHandleMaxOrderByAggregateInput
    _min?: PatientHandleMinOrderByAggregateInput
    _sum?: PatientHandleSumOrderByAggregateInput
  }

  export type PatientHandleScalarWhereWithAggregatesInput = {
    AND?: PatientHandleScalarWhereWithAggregatesInput | PatientHandleScalarWhereWithAggregatesInput[]
    OR?: PatientHandleScalarWhereWithAggregatesInput[]
    NOT?: PatientHandleScalarWhereWithAggregatesInput | PatientHandleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PatientHandle"> | string
    patientId?: StringWithAggregatesFilter<"PatientHandle"> | string
    nurseId?: StringWithAggregatesFilter<"PatientHandle"> | string
    bradenQ?: IntWithAggregatesFilter<"PatientHandle"> | number
    foto?: StringNullableWithAggregatesFilter<"PatientHandle"> | string | null
    status?: EnumStatusWithAggregatesFilter<"PatientHandle"> | $Enums.Status
    createdAt?: DateTimeWithAggregatesFilter<"PatientHandle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PatientHandle"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisiHistory?: ReposisiHistoryCreateNestedManyWithoutNurseInput
    nurseDetail?: NurseDetailCreateNestedManyWithoutUserInput
    DailyActivity?: DailyActivityCreateNestedManyWithoutNurseInput
    PatientHandle?: PatientHandleCreateNestedManyWithoutNurseInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisiHistory?: ReposisiHistoryUncheckedCreateNestedManyWithoutNurseInput
    nurseDetail?: NurseDetailUncheckedCreateNestedManyWithoutUserInput
    DailyActivity?: DailyActivityUncheckedCreateNestedManyWithoutNurseInput
    PatientHandle?: PatientHandleUncheckedCreateNestedManyWithoutNurseInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisiHistory?: ReposisiHistoryUpdateManyWithoutNurseNestedInput
    nurseDetail?: NurseDetailUpdateManyWithoutUserNestedInput
    DailyActivity?: DailyActivityUpdateManyWithoutNurseNestedInput
    PatientHandle?: PatientHandleUpdateManyWithoutNurseNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisiHistory?: ReposisiHistoryUncheckedUpdateManyWithoutNurseNestedInput
    nurseDetail?: NurseDetailUncheckedUpdateManyWithoutUserNestedInput
    DailyActivity?: DailyActivityUncheckedUpdateManyWithoutNurseNestedInput
    PatientHandle?: PatientHandleUncheckedUpdateManyWithoutNurseNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NurseDetailCreateInput = {
    id?: string
    phone: string
    address: string
    nurseStatus: $Enums.NurseStatus
    user: UserCreateNestedOneWithoutNurseDetailInput
  }

  export type NurseDetailUncheckedCreateInput = {
    id?: string
    userId: string
    phone: string
    address: string
    nurseStatus: $Enums.NurseStatus
  }

  export type NurseDetailUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    nurseStatus?: EnumNurseStatusFieldUpdateOperationsInput | $Enums.NurseStatus
    user?: UserUpdateOneRequiredWithoutNurseDetailNestedInput
  }

  export type NurseDetailUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    nurseStatus?: EnumNurseStatusFieldUpdateOperationsInput | $Enums.NurseStatus
  }

  export type NurseDetailCreateManyInput = {
    id?: string
    userId: string
    phone: string
    address: string
    nurseStatus: $Enums.NurseStatus
  }

  export type NurseDetailUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    nurseStatus?: EnumNurseStatusFieldUpdateOperationsInput | $Enums.NurseStatus
  }

  export type NurseDetailUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    nurseStatus?: EnumNurseStatusFieldUpdateOperationsInput | $Enums.NurseStatus
  }

  export type DailyActivityCreateInput = {
    id?: string
    date?: Date | string
    shiftType?: string | null
    nurse: UserCreateNestedOneWithoutDailyActivityInput
  }

  export type DailyActivityUncheckedCreateInput = {
    id?: string
    nurseId: string
    date?: Date | string
    shiftType?: string | null
  }

  export type DailyActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shiftType?: NullableStringFieldUpdateOperationsInput | string | null
    nurse?: UserUpdateOneRequiredWithoutDailyActivityNestedInput
  }

  export type DailyActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nurseId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shiftType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DailyActivityCreateManyInput = {
    id?: string
    nurseId: string
    date?: Date | string
    shiftType?: string | null
  }

  export type DailyActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shiftType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DailyActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nurseId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shiftType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientCreateInput = {
    id?: string
    name: string
    nik: string
    birthDate: Date | string
    bedNumber: number
    gender: $Enums.Gender
    bradenQ: number
    status: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisi?: ReposisiHistoryCreateNestedManyWithoutPatientInput
    PatientHandle?: PatientHandleCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: string
    name: string
    nik: string
    birthDate: Date | string
    bedNumber: number
    gender: $Enums.Gender
    bradenQ: number
    status: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisi?: ReposisiHistoryUncheckedCreateNestedManyWithoutPatientInput
    PatientHandle?: PatientHandleUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    bedNumber?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bradenQ?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisi?: ReposisiHistoryUpdateManyWithoutPatientNestedInput
    PatientHandle?: PatientHandleUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    bedNumber?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bradenQ?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisi?: ReposisiHistoryUncheckedUpdateManyWithoutPatientNestedInput
    PatientHandle?: PatientHandleUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: string
    name: string
    nik: string
    birthDate: Date | string
    bedNumber: number
    gender: $Enums.Gender
    bradenQ: number
    status: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    bedNumber?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bradenQ?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    bedNumber?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bradenQ?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReposisiHistoryCreateInput = {
    id?: string
    position: string
    bradenQ: number
    Time?: Date | string
    foto?: string | null
    patient: PatientCreateNestedOneWithoutReposisiInput
    nurse: UserCreateNestedOneWithoutReposisiHistoryInput
  }

  export type ReposisiHistoryUncheckedCreateInput = {
    id?: string
    patientId: string
    position: string
    nurseId: string
    bradenQ: number
    Time?: Date | string
    foto?: string | null
  }

  export type ReposisiHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    Time?: DateTimeFieldUpdateOperationsInput | Date | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    patient?: PatientUpdateOneRequiredWithoutReposisiNestedInput
    nurse?: UserUpdateOneRequiredWithoutReposisiHistoryNestedInput
  }

  export type ReposisiHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    nurseId?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    Time?: DateTimeFieldUpdateOperationsInput | Date | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReposisiHistoryCreateManyInput = {
    id?: string
    patientId: string
    position: string
    nurseId: string
    bradenQ: number
    Time?: Date | string
    foto?: string | null
  }

  export type ReposisiHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    Time?: DateTimeFieldUpdateOperationsInput | Date | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReposisiHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    nurseId?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    Time?: DateTimeFieldUpdateOperationsInput | Date | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientHandleCreateInput = {
    id?: string
    bradenQ: number
    foto?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutPatientHandleInput
    nurse: UserCreateNestedOneWithoutPatientHandleInput
  }

  export type PatientHandleUncheckedCreateInput = {
    id?: string
    patientId: string
    nurseId: string
    bradenQ: number
    foto?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientHandleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutPatientHandleNestedInput
    nurse?: UserUpdateOneRequiredWithoutPatientHandleNestedInput
  }

  export type PatientHandleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    nurseId?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientHandleCreateManyInput = {
    id?: string
    patientId: string
    nurseId: string
    bradenQ: number
    foto?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientHandleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientHandleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    nurseId?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ReposisiHistoryListRelationFilter = {
    every?: ReposisiHistoryWhereInput
    some?: ReposisiHistoryWhereInput
    none?: ReposisiHistoryWhereInput
  }

  export type NurseDetailListRelationFilter = {
    every?: NurseDetailWhereInput
    some?: NurseDetailWhereInput
    none?: NurseDetailWhereInput
  }

  export type DailyActivityListRelationFilter = {
    every?: DailyActivityWhereInput
    some?: DailyActivityWhereInput
    none?: DailyActivityWhereInput
  }

  export type PatientHandleListRelationFilter = {
    every?: PatientHandleWhereInput
    some?: PatientHandleWhereInput
    none?: PatientHandleWhereInput
  }

  export type ReposisiHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NurseDetailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientHandleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumNurseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NurseStatus | EnumNurseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NurseStatus[] | ListEnumNurseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NurseStatus[] | ListEnumNurseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNurseStatusFilter<$PrismaModel> | $Enums.NurseStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type NurseDetailCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    nurseStatus?: SortOrder
  }

  export type NurseDetailMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    nurseStatus?: SortOrder
  }

  export type NurseDetailMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    nurseStatus?: SortOrder
  }

  export type EnumNurseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NurseStatus | EnumNurseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NurseStatus[] | ListEnumNurseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NurseStatus[] | ListEnumNurseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNurseStatusWithAggregatesFilter<$PrismaModel> | $Enums.NurseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNurseStatusFilter<$PrismaModel>
    _max?: NestedEnumNurseStatusFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DailyActivityNurseIdDateCompoundUniqueInput = {
    nurseId: string
    date: Date | string
  }

  export type DailyActivityCountOrderByAggregateInput = {
    id?: SortOrder
    nurseId?: SortOrder
    date?: SortOrder
    shiftType?: SortOrder
  }

  export type DailyActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    nurseId?: SortOrder
    date?: SortOrder
    shiftType?: SortOrder
  }

  export type DailyActivityMinOrderByAggregateInput = {
    id?: SortOrder
    nurseId?: SortOrder
    date?: SortOrder
    shiftType?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nik?: SortOrder
    birthDate?: SortOrder
    bedNumber?: SortOrder
    gender?: SortOrder
    bradenQ?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientAvgOrderByAggregateInput = {
    bedNumber?: SortOrder
    bradenQ?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nik?: SortOrder
    birthDate?: SortOrder
    bedNumber?: SortOrder
    gender?: SortOrder
    bradenQ?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nik?: SortOrder
    birthDate?: SortOrder
    bedNumber?: SortOrder
    gender?: SortOrder
    bradenQ?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientSumOrderByAggregateInput = {
    bedNumber?: SortOrder
    bradenQ?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type PatientScalarRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type ReposisiHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    position?: SortOrder
    nurseId?: SortOrder
    bradenQ?: SortOrder
    Time?: SortOrder
    foto?: SortOrder
  }

  export type ReposisiHistoryAvgOrderByAggregateInput = {
    bradenQ?: SortOrder
  }

  export type ReposisiHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    position?: SortOrder
    nurseId?: SortOrder
    bradenQ?: SortOrder
    Time?: SortOrder
    foto?: SortOrder
  }

  export type ReposisiHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    position?: SortOrder
    nurseId?: SortOrder
    bradenQ?: SortOrder
    Time?: SortOrder
    foto?: SortOrder
  }

  export type ReposisiHistorySumOrderByAggregateInput = {
    bradenQ?: SortOrder
  }

  export type PatientHandlePatientIdNurseIdCompoundUniqueInput = {
    patientId: string
    nurseId: string
  }

  export type PatientHandleCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    bradenQ?: SortOrder
    foto?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientHandleAvgOrderByAggregateInput = {
    bradenQ?: SortOrder
  }

  export type PatientHandleMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    bradenQ?: SortOrder
    foto?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientHandleMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    bradenQ?: SortOrder
    foto?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientHandleSumOrderByAggregateInput = {
    bradenQ?: SortOrder
  }

  export type ReposisiHistoryCreateNestedManyWithoutNurseInput = {
    create?: XOR<ReposisiHistoryCreateWithoutNurseInput, ReposisiHistoryUncheckedCreateWithoutNurseInput> | ReposisiHistoryCreateWithoutNurseInput[] | ReposisiHistoryUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: ReposisiHistoryCreateOrConnectWithoutNurseInput | ReposisiHistoryCreateOrConnectWithoutNurseInput[]
    createMany?: ReposisiHistoryCreateManyNurseInputEnvelope
    connect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
  }

  export type NurseDetailCreateNestedManyWithoutUserInput = {
    create?: XOR<NurseDetailCreateWithoutUserInput, NurseDetailUncheckedCreateWithoutUserInput> | NurseDetailCreateWithoutUserInput[] | NurseDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NurseDetailCreateOrConnectWithoutUserInput | NurseDetailCreateOrConnectWithoutUserInput[]
    createMany?: NurseDetailCreateManyUserInputEnvelope
    connect?: NurseDetailWhereUniqueInput | NurseDetailWhereUniqueInput[]
  }

  export type DailyActivityCreateNestedManyWithoutNurseInput = {
    create?: XOR<DailyActivityCreateWithoutNurseInput, DailyActivityUncheckedCreateWithoutNurseInput> | DailyActivityCreateWithoutNurseInput[] | DailyActivityUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: DailyActivityCreateOrConnectWithoutNurseInput | DailyActivityCreateOrConnectWithoutNurseInput[]
    createMany?: DailyActivityCreateManyNurseInputEnvelope
    connect?: DailyActivityWhereUniqueInput | DailyActivityWhereUniqueInput[]
  }

  export type PatientHandleCreateNestedManyWithoutNurseInput = {
    create?: XOR<PatientHandleCreateWithoutNurseInput, PatientHandleUncheckedCreateWithoutNurseInput> | PatientHandleCreateWithoutNurseInput[] | PatientHandleUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: PatientHandleCreateOrConnectWithoutNurseInput | PatientHandleCreateOrConnectWithoutNurseInput[]
    createMany?: PatientHandleCreateManyNurseInputEnvelope
    connect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
  }

  export type ReposisiHistoryUncheckedCreateNestedManyWithoutNurseInput = {
    create?: XOR<ReposisiHistoryCreateWithoutNurseInput, ReposisiHistoryUncheckedCreateWithoutNurseInput> | ReposisiHistoryCreateWithoutNurseInput[] | ReposisiHistoryUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: ReposisiHistoryCreateOrConnectWithoutNurseInput | ReposisiHistoryCreateOrConnectWithoutNurseInput[]
    createMany?: ReposisiHistoryCreateManyNurseInputEnvelope
    connect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
  }

  export type NurseDetailUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NurseDetailCreateWithoutUserInput, NurseDetailUncheckedCreateWithoutUserInput> | NurseDetailCreateWithoutUserInput[] | NurseDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NurseDetailCreateOrConnectWithoutUserInput | NurseDetailCreateOrConnectWithoutUserInput[]
    createMany?: NurseDetailCreateManyUserInputEnvelope
    connect?: NurseDetailWhereUniqueInput | NurseDetailWhereUniqueInput[]
  }

  export type DailyActivityUncheckedCreateNestedManyWithoutNurseInput = {
    create?: XOR<DailyActivityCreateWithoutNurseInput, DailyActivityUncheckedCreateWithoutNurseInput> | DailyActivityCreateWithoutNurseInput[] | DailyActivityUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: DailyActivityCreateOrConnectWithoutNurseInput | DailyActivityCreateOrConnectWithoutNurseInput[]
    createMany?: DailyActivityCreateManyNurseInputEnvelope
    connect?: DailyActivityWhereUniqueInput | DailyActivityWhereUniqueInput[]
  }

  export type PatientHandleUncheckedCreateNestedManyWithoutNurseInput = {
    create?: XOR<PatientHandleCreateWithoutNurseInput, PatientHandleUncheckedCreateWithoutNurseInput> | PatientHandleCreateWithoutNurseInput[] | PatientHandleUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: PatientHandleCreateOrConnectWithoutNurseInput | PatientHandleCreateOrConnectWithoutNurseInput[]
    createMany?: PatientHandleCreateManyNurseInputEnvelope
    connect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ReposisiHistoryUpdateManyWithoutNurseNestedInput = {
    create?: XOR<ReposisiHistoryCreateWithoutNurseInput, ReposisiHistoryUncheckedCreateWithoutNurseInput> | ReposisiHistoryCreateWithoutNurseInput[] | ReposisiHistoryUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: ReposisiHistoryCreateOrConnectWithoutNurseInput | ReposisiHistoryCreateOrConnectWithoutNurseInput[]
    upsert?: ReposisiHistoryUpsertWithWhereUniqueWithoutNurseInput | ReposisiHistoryUpsertWithWhereUniqueWithoutNurseInput[]
    createMany?: ReposisiHistoryCreateManyNurseInputEnvelope
    set?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    disconnect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    delete?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    connect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    update?: ReposisiHistoryUpdateWithWhereUniqueWithoutNurseInput | ReposisiHistoryUpdateWithWhereUniqueWithoutNurseInput[]
    updateMany?: ReposisiHistoryUpdateManyWithWhereWithoutNurseInput | ReposisiHistoryUpdateManyWithWhereWithoutNurseInput[]
    deleteMany?: ReposisiHistoryScalarWhereInput | ReposisiHistoryScalarWhereInput[]
  }

  export type NurseDetailUpdateManyWithoutUserNestedInput = {
    create?: XOR<NurseDetailCreateWithoutUserInput, NurseDetailUncheckedCreateWithoutUserInput> | NurseDetailCreateWithoutUserInput[] | NurseDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NurseDetailCreateOrConnectWithoutUserInput | NurseDetailCreateOrConnectWithoutUserInput[]
    upsert?: NurseDetailUpsertWithWhereUniqueWithoutUserInput | NurseDetailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NurseDetailCreateManyUserInputEnvelope
    set?: NurseDetailWhereUniqueInput | NurseDetailWhereUniqueInput[]
    disconnect?: NurseDetailWhereUniqueInput | NurseDetailWhereUniqueInput[]
    delete?: NurseDetailWhereUniqueInput | NurseDetailWhereUniqueInput[]
    connect?: NurseDetailWhereUniqueInput | NurseDetailWhereUniqueInput[]
    update?: NurseDetailUpdateWithWhereUniqueWithoutUserInput | NurseDetailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NurseDetailUpdateManyWithWhereWithoutUserInput | NurseDetailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NurseDetailScalarWhereInput | NurseDetailScalarWhereInput[]
  }

  export type DailyActivityUpdateManyWithoutNurseNestedInput = {
    create?: XOR<DailyActivityCreateWithoutNurseInput, DailyActivityUncheckedCreateWithoutNurseInput> | DailyActivityCreateWithoutNurseInput[] | DailyActivityUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: DailyActivityCreateOrConnectWithoutNurseInput | DailyActivityCreateOrConnectWithoutNurseInput[]
    upsert?: DailyActivityUpsertWithWhereUniqueWithoutNurseInput | DailyActivityUpsertWithWhereUniqueWithoutNurseInput[]
    createMany?: DailyActivityCreateManyNurseInputEnvelope
    set?: DailyActivityWhereUniqueInput | DailyActivityWhereUniqueInput[]
    disconnect?: DailyActivityWhereUniqueInput | DailyActivityWhereUniqueInput[]
    delete?: DailyActivityWhereUniqueInput | DailyActivityWhereUniqueInput[]
    connect?: DailyActivityWhereUniqueInput | DailyActivityWhereUniqueInput[]
    update?: DailyActivityUpdateWithWhereUniqueWithoutNurseInput | DailyActivityUpdateWithWhereUniqueWithoutNurseInput[]
    updateMany?: DailyActivityUpdateManyWithWhereWithoutNurseInput | DailyActivityUpdateManyWithWhereWithoutNurseInput[]
    deleteMany?: DailyActivityScalarWhereInput | DailyActivityScalarWhereInput[]
  }

  export type PatientHandleUpdateManyWithoutNurseNestedInput = {
    create?: XOR<PatientHandleCreateWithoutNurseInput, PatientHandleUncheckedCreateWithoutNurseInput> | PatientHandleCreateWithoutNurseInput[] | PatientHandleUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: PatientHandleCreateOrConnectWithoutNurseInput | PatientHandleCreateOrConnectWithoutNurseInput[]
    upsert?: PatientHandleUpsertWithWhereUniqueWithoutNurseInput | PatientHandleUpsertWithWhereUniqueWithoutNurseInput[]
    createMany?: PatientHandleCreateManyNurseInputEnvelope
    set?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    disconnect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    delete?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    connect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    update?: PatientHandleUpdateWithWhereUniqueWithoutNurseInput | PatientHandleUpdateWithWhereUniqueWithoutNurseInput[]
    updateMany?: PatientHandleUpdateManyWithWhereWithoutNurseInput | PatientHandleUpdateManyWithWhereWithoutNurseInput[]
    deleteMany?: PatientHandleScalarWhereInput | PatientHandleScalarWhereInput[]
  }

  export type ReposisiHistoryUncheckedUpdateManyWithoutNurseNestedInput = {
    create?: XOR<ReposisiHistoryCreateWithoutNurseInput, ReposisiHistoryUncheckedCreateWithoutNurseInput> | ReposisiHistoryCreateWithoutNurseInput[] | ReposisiHistoryUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: ReposisiHistoryCreateOrConnectWithoutNurseInput | ReposisiHistoryCreateOrConnectWithoutNurseInput[]
    upsert?: ReposisiHistoryUpsertWithWhereUniqueWithoutNurseInput | ReposisiHistoryUpsertWithWhereUniqueWithoutNurseInput[]
    createMany?: ReposisiHistoryCreateManyNurseInputEnvelope
    set?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    disconnect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    delete?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    connect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    update?: ReposisiHistoryUpdateWithWhereUniqueWithoutNurseInput | ReposisiHistoryUpdateWithWhereUniqueWithoutNurseInput[]
    updateMany?: ReposisiHistoryUpdateManyWithWhereWithoutNurseInput | ReposisiHistoryUpdateManyWithWhereWithoutNurseInput[]
    deleteMany?: ReposisiHistoryScalarWhereInput | ReposisiHistoryScalarWhereInput[]
  }

  export type NurseDetailUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NurseDetailCreateWithoutUserInput, NurseDetailUncheckedCreateWithoutUserInput> | NurseDetailCreateWithoutUserInput[] | NurseDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NurseDetailCreateOrConnectWithoutUserInput | NurseDetailCreateOrConnectWithoutUserInput[]
    upsert?: NurseDetailUpsertWithWhereUniqueWithoutUserInput | NurseDetailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NurseDetailCreateManyUserInputEnvelope
    set?: NurseDetailWhereUniqueInput | NurseDetailWhereUniqueInput[]
    disconnect?: NurseDetailWhereUniqueInput | NurseDetailWhereUniqueInput[]
    delete?: NurseDetailWhereUniqueInput | NurseDetailWhereUniqueInput[]
    connect?: NurseDetailWhereUniqueInput | NurseDetailWhereUniqueInput[]
    update?: NurseDetailUpdateWithWhereUniqueWithoutUserInput | NurseDetailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NurseDetailUpdateManyWithWhereWithoutUserInput | NurseDetailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NurseDetailScalarWhereInput | NurseDetailScalarWhereInput[]
  }

  export type DailyActivityUncheckedUpdateManyWithoutNurseNestedInput = {
    create?: XOR<DailyActivityCreateWithoutNurseInput, DailyActivityUncheckedCreateWithoutNurseInput> | DailyActivityCreateWithoutNurseInput[] | DailyActivityUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: DailyActivityCreateOrConnectWithoutNurseInput | DailyActivityCreateOrConnectWithoutNurseInput[]
    upsert?: DailyActivityUpsertWithWhereUniqueWithoutNurseInput | DailyActivityUpsertWithWhereUniqueWithoutNurseInput[]
    createMany?: DailyActivityCreateManyNurseInputEnvelope
    set?: DailyActivityWhereUniqueInput | DailyActivityWhereUniqueInput[]
    disconnect?: DailyActivityWhereUniqueInput | DailyActivityWhereUniqueInput[]
    delete?: DailyActivityWhereUniqueInput | DailyActivityWhereUniqueInput[]
    connect?: DailyActivityWhereUniqueInput | DailyActivityWhereUniqueInput[]
    update?: DailyActivityUpdateWithWhereUniqueWithoutNurseInput | DailyActivityUpdateWithWhereUniqueWithoutNurseInput[]
    updateMany?: DailyActivityUpdateManyWithWhereWithoutNurseInput | DailyActivityUpdateManyWithWhereWithoutNurseInput[]
    deleteMany?: DailyActivityScalarWhereInput | DailyActivityScalarWhereInput[]
  }

  export type PatientHandleUncheckedUpdateManyWithoutNurseNestedInput = {
    create?: XOR<PatientHandleCreateWithoutNurseInput, PatientHandleUncheckedCreateWithoutNurseInput> | PatientHandleCreateWithoutNurseInput[] | PatientHandleUncheckedCreateWithoutNurseInput[]
    connectOrCreate?: PatientHandleCreateOrConnectWithoutNurseInput | PatientHandleCreateOrConnectWithoutNurseInput[]
    upsert?: PatientHandleUpsertWithWhereUniqueWithoutNurseInput | PatientHandleUpsertWithWhereUniqueWithoutNurseInput[]
    createMany?: PatientHandleCreateManyNurseInputEnvelope
    set?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    disconnect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    delete?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    connect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    update?: PatientHandleUpdateWithWhereUniqueWithoutNurseInput | PatientHandleUpdateWithWhereUniqueWithoutNurseInput[]
    updateMany?: PatientHandleUpdateManyWithWhereWithoutNurseInput | PatientHandleUpdateManyWithWhereWithoutNurseInput[]
    deleteMany?: PatientHandleScalarWhereInput | PatientHandleScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutNurseDetailInput = {
    create?: XOR<UserCreateWithoutNurseDetailInput, UserUncheckedCreateWithoutNurseDetailInput>
    connectOrCreate?: UserCreateOrConnectWithoutNurseDetailInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNurseStatusFieldUpdateOperationsInput = {
    set?: $Enums.NurseStatus
  }

  export type UserUpdateOneRequiredWithoutNurseDetailNestedInput = {
    create?: XOR<UserCreateWithoutNurseDetailInput, UserUncheckedCreateWithoutNurseDetailInput>
    connectOrCreate?: UserCreateOrConnectWithoutNurseDetailInput
    upsert?: UserUpsertWithoutNurseDetailInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNurseDetailInput, UserUpdateWithoutNurseDetailInput>, UserUncheckedUpdateWithoutNurseDetailInput>
  }

  export type UserCreateNestedOneWithoutDailyActivityInput = {
    create?: XOR<UserCreateWithoutDailyActivityInput, UserUncheckedCreateWithoutDailyActivityInput>
    connectOrCreate?: UserCreateOrConnectWithoutDailyActivityInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutDailyActivityNestedInput = {
    create?: XOR<UserCreateWithoutDailyActivityInput, UserUncheckedCreateWithoutDailyActivityInput>
    connectOrCreate?: UserCreateOrConnectWithoutDailyActivityInput
    upsert?: UserUpsertWithoutDailyActivityInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDailyActivityInput, UserUpdateWithoutDailyActivityInput>, UserUncheckedUpdateWithoutDailyActivityInput>
  }

  export type ReposisiHistoryCreateNestedManyWithoutPatientInput = {
    create?: XOR<ReposisiHistoryCreateWithoutPatientInput, ReposisiHistoryUncheckedCreateWithoutPatientInput> | ReposisiHistoryCreateWithoutPatientInput[] | ReposisiHistoryUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ReposisiHistoryCreateOrConnectWithoutPatientInput | ReposisiHistoryCreateOrConnectWithoutPatientInput[]
    createMany?: ReposisiHistoryCreateManyPatientInputEnvelope
    connect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
  }

  export type PatientHandleCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientHandleCreateWithoutPatientInput, PatientHandleUncheckedCreateWithoutPatientInput> | PatientHandleCreateWithoutPatientInput[] | PatientHandleUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientHandleCreateOrConnectWithoutPatientInput | PatientHandleCreateOrConnectWithoutPatientInput[]
    createMany?: PatientHandleCreateManyPatientInputEnvelope
    connect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
  }

  export type ReposisiHistoryUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<ReposisiHistoryCreateWithoutPatientInput, ReposisiHistoryUncheckedCreateWithoutPatientInput> | ReposisiHistoryCreateWithoutPatientInput[] | ReposisiHistoryUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ReposisiHistoryCreateOrConnectWithoutPatientInput | ReposisiHistoryCreateOrConnectWithoutPatientInput[]
    createMany?: ReposisiHistoryCreateManyPatientInputEnvelope
    connect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
  }

  export type PatientHandleUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientHandleCreateWithoutPatientInput, PatientHandleUncheckedCreateWithoutPatientInput> | PatientHandleCreateWithoutPatientInput[] | PatientHandleUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientHandleCreateOrConnectWithoutPatientInput | PatientHandleCreateOrConnectWithoutPatientInput[]
    createMany?: PatientHandleCreateManyPatientInputEnvelope
    connect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type ReposisiHistoryUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ReposisiHistoryCreateWithoutPatientInput, ReposisiHistoryUncheckedCreateWithoutPatientInput> | ReposisiHistoryCreateWithoutPatientInput[] | ReposisiHistoryUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ReposisiHistoryCreateOrConnectWithoutPatientInput | ReposisiHistoryCreateOrConnectWithoutPatientInput[]
    upsert?: ReposisiHistoryUpsertWithWhereUniqueWithoutPatientInput | ReposisiHistoryUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ReposisiHistoryCreateManyPatientInputEnvelope
    set?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    disconnect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    delete?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    connect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    update?: ReposisiHistoryUpdateWithWhereUniqueWithoutPatientInput | ReposisiHistoryUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ReposisiHistoryUpdateManyWithWhereWithoutPatientInput | ReposisiHistoryUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ReposisiHistoryScalarWhereInput | ReposisiHistoryScalarWhereInput[]
  }

  export type PatientHandleUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientHandleCreateWithoutPatientInput, PatientHandleUncheckedCreateWithoutPatientInput> | PatientHandleCreateWithoutPatientInput[] | PatientHandleUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientHandleCreateOrConnectWithoutPatientInput | PatientHandleCreateOrConnectWithoutPatientInput[]
    upsert?: PatientHandleUpsertWithWhereUniqueWithoutPatientInput | PatientHandleUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientHandleCreateManyPatientInputEnvelope
    set?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    disconnect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    delete?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    connect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    update?: PatientHandleUpdateWithWhereUniqueWithoutPatientInput | PatientHandleUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientHandleUpdateManyWithWhereWithoutPatientInput | PatientHandleUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientHandleScalarWhereInput | PatientHandleScalarWhereInput[]
  }

  export type ReposisiHistoryUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ReposisiHistoryCreateWithoutPatientInput, ReposisiHistoryUncheckedCreateWithoutPatientInput> | ReposisiHistoryCreateWithoutPatientInput[] | ReposisiHistoryUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ReposisiHistoryCreateOrConnectWithoutPatientInput | ReposisiHistoryCreateOrConnectWithoutPatientInput[]
    upsert?: ReposisiHistoryUpsertWithWhereUniqueWithoutPatientInput | ReposisiHistoryUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ReposisiHistoryCreateManyPatientInputEnvelope
    set?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    disconnect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    delete?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    connect?: ReposisiHistoryWhereUniqueInput | ReposisiHistoryWhereUniqueInput[]
    update?: ReposisiHistoryUpdateWithWhereUniqueWithoutPatientInput | ReposisiHistoryUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ReposisiHistoryUpdateManyWithWhereWithoutPatientInput | ReposisiHistoryUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ReposisiHistoryScalarWhereInput | ReposisiHistoryScalarWhereInput[]
  }

  export type PatientHandleUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientHandleCreateWithoutPatientInput, PatientHandleUncheckedCreateWithoutPatientInput> | PatientHandleCreateWithoutPatientInput[] | PatientHandleUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientHandleCreateOrConnectWithoutPatientInput | PatientHandleCreateOrConnectWithoutPatientInput[]
    upsert?: PatientHandleUpsertWithWhereUniqueWithoutPatientInput | PatientHandleUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientHandleCreateManyPatientInputEnvelope
    set?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    disconnect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    delete?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    connect?: PatientHandleWhereUniqueInput | PatientHandleWhereUniqueInput[]
    update?: PatientHandleUpdateWithWhereUniqueWithoutPatientInput | PatientHandleUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientHandleUpdateManyWithWhereWithoutPatientInput | PatientHandleUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientHandleScalarWhereInput | PatientHandleScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutReposisiInput = {
    create?: XOR<PatientCreateWithoutReposisiInput, PatientUncheckedCreateWithoutReposisiInput>
    connectOrCreate?: PatientCreateOrConnectWithoutReposisiInput
    connect?: PatientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReposisiHistoryInput = {
    create?: XOR<UserCreateWithoutReposisiHistoryInput, UserUncheckedCreateWithoutReposisiHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutReposisiHistoryInput
    connect?: UserWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutReposisiNestedInput = {
    create?: XOR<PatientCreateWithoutReposisiInput, PatientUncheckedCreateWithoutReposisiInput>
    connectOrCreate?: PatientCreateOrConnectWithoutReposisiInput
    upsert?: PatientUpsertWithoutReposisiInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutReposisiInput, PatientUpdateWithoutReposisiInput>, PatientUncheckedUpdateWithoutReposisiInput>
  }

  export type UserUpdateOneRequiredWithoutReposisiHistoryNestedInput = {
    create?: XOR<UserCreateWithoutReposisiHistoryInput, UserUncheckedCreateWithoutReposisiHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutReposisiHistoryInput
    upsert?: UserUpsertWithoutReposisiHistoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReposisiHistoryInput, UserUpdateWithoutReposisiHistoryInput>, UserUncheckedUpdateWithoutReposisiHistoryInput>
  }

  export type PatientCreateNestedOneWithoutPatientHandleInput = {
    create?: XOR<PatientCreateWithoutPatientHandleInput, PatientUncheckedCreateWithoutPatientHandleInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPatientHandleInput
    connect?: PatientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPatientHandleInput = {
    create?: XOR<UserCreateWithoutPatientHandleInput, UserUncheckedCreateWithoutPatientHandleInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientHandleInput
    connect?: UserWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutPatientHandleNestedInput = {
    create?: XOR<PatientCreateWithoutPatientHandleInput, PatientUncheckedCreateWithoutPatientHandleInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPatientHandleInput
    upsert?: PatientUpsertWithoutPatientHandleInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutPatientHandleInput, PatientUpdateWithoutPatientHandleInput>, PatientUncheckedUpdateWithoutPatientHandleInput>
  }

  export type UserUpdateOneRequiredWithoutPatientHandleNestedInput = {
    create?: XOR<UserCreateWithoutPatientHandleInput, UserUncheckedCreateWithoutPatientHandleInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientHandleInput
    upsert?: UserUpsertWithoutPatientHandleInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientHandleInput, UserUpdateWithoutPatientHandleInput>, UserUncheckedUpdateWithoutPatientHandleInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumNurseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NurseStatus | EnumNurseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NurseStatus[] | ListEnumNurseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NurseStatus[] | ListEnumNurseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNurseStatusFilter<$PrismaModel> | $Enums.NurseStatus
  }

  export type NestedEnumNurseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NurseStatus | EnumNurseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NurseStatus[] | ListEnumNurseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NurseStatus[] | ListEnumNurseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNurseStatusWithAggregatesFilter<$PrismaModel> | $Enums.NurseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNurseStatusFilter<$PrismaModel>
    _max?: NestedEnumNurseStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type ReposisiHistoryCreateWithoutNurseInput = {
    id?: string
    position: string
    bradenQ: number
    Time?: Date | string
    foto?: string | null
    patient: PatientCreateNestedOneWithoutReposisiInput
  }

  export type ReposisiHistoryUncheckedCreateWithoutNurseInput = {
    id?: string
    patientId: string
    position: string
    bradenQ: number
    Time?: Date | string
    foto?: string | null
  }

  export type ReposisiHistoryCreateOrConnectWithoutNurseInput = {
    where: ReposisiHistoryWhereUniqueInput
    create: XOR<ReposisiHistoryCreateWithoutNurseInput, ReposisiHistoryUncheckedCreateWithoutNurseInput>
  }

  export type ReposisiHistoryCreateManyNurseInputEnvelope = {
    data: ReposisiHistoryCreateManyNurseInput | ReposisiHistoryCreateManyNurseInput[]
    skipDuplicates?: boolean
  }

  export type NurseDetailCreateWithoutUserInput = {
    id?: string
    phone: string
    address: string
    nurseStatus: $Enums.NurseStatus
  }

  export type NurseDetailUncheckedCreateWithoutUserInput = {
    id?: string
    phone: string
    address: string
    nurseStatus: $Enums.NurseStatus
  }

  export type NurseDetailCreateOrConnectWithoutUserInput = {
    where: NurseDetailWhereUniqueInput
    create: XOR<NurseDetailCreateWithoutUserInput, NurseDetailUncheckedCreateWithoutUserInput>
  }

  export type NurseDetailCreateManyUserInputEnvelope = {
    data: NurseDetailCreateManyUserInput | NurseDetailCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DailyActivityCreateWithoutNurseInput = {
    id?: string
    date?: Date | string
    shiftType?: string | null
  }

  export type DailyActivityUncheckedCreateWithoutNurseInput = {
    id?: string
    date?: Date | string
    shiftType?: string | null
  }

  export type DailyActivityCreateOrConnectWithoutNurseInput = {
    where: DailyActivityWhereUniqueInput
    create: XOR<DailyActivityCreateWithoutNurseInput, DailyActivityUncheckedCreateWithoutNurseInput>
  }

  export type DailyActivityCreateManyNurseInputEnvelope = {
    data: DailyActivityCreateManyNurseInput | DailyActivityCreateManyNurseInput[]
    skipDuplicates?: boolean
  }

  export type PatientHandleCreateWithoutNurseInput = {
    id?: string
    bradenQ: number
    foto?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutPatientHandleInput
  }

  export type PatientHandleUncheckedCreateWithoutNurseInput = {
    id?: string
    patientId: string
    bradenQ: number
    foto?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientHandleCreateOrConnectWithoutNurseInput = {
    where: PatientHandleWhereUniqueInput
    create: XOR<PatientHandleCreateWithoutNurseInput, PatientHandleUncheckedCreateWithoutNurseInput>
  }

  export type PatientHandleCreateManyNurseInputEnvelope = {
    data: PatientHandleCreateManyNurseInput | PatientHandleCreateManyNurseInput[]
    skipDuplicates?: boolean
  }

  export type ReposisiHistoryUpsertWithWhereUniqueWithoutNurseInput = {
    where: ReposisiHistoryWhereUniqueInput
    update: XOR<ReposisiHistoryUpdateWithoutNurseInput, ReposisiHistoryUncheckedUpdateWithoutNurseInput>
    create: XOR<ReposisiHistoryCreateWithoutNurseInput, ReposisiHistoryUncheckedCreateWithoutNurseInput>
  }

  export type ReposisiHistoryUpdateWithWhereUniqueWithoutNurseInput = {
    where: ReposisiHistoryWhereUniqueInput
    data: XOR<ReposisiHistoryUpdateWithoutNurseInput, ReposisiHistoryUncheckedUpdateWithoutNurseInput>
  }

  export type ReposisiHistoryUpdateManyWithWhereWithoutNurseInput = {
    where: ReposisiHistoryScalarWhereInput
    data: XOR<ReposisiHistoryUpdateManyMutationInput, ReposisiHistoryUncheckedUpdateManyWithoutNurseInput>
  }

  export type ReposisiHistoryScalarWhereInput = {
    AND?: ReposisiHistoryScalarWhereInput | ReposisiHistoryScalarWhereInput[]
    OR?: ReposisiHistoryScalarWhereInput[]
    NOT?: ReposisiHistoryScalarWhereInput | ReposisiHistoryScalarWhereInput[]
    id?: StringFilter<"ReposisiHistory"> | string
    patientId?: StringFilter<"ReposisiHistory"> | string
    position?: StringFilter<"ReposisiHistory"> | string
    nurseId?: StringFilter<"ReposisiHistory"> | string
    bradenQ?: IntFilter<"ReposisiHistory"> | number
    Time?: DateTimeFilter<"ReposisiHistory"> | Date | string
    foto?: StringNullableFilter<"ReposisiHistory"> | string | null
  }

  export type NurseDetailUpsertWithWhereUniqueWithoutUserInput = {
    where: NurseDetailWhereUniqueInput
    update: XOR<NurseDetailUpdateWithoutUserInput, NurseDetailUncheckedUpdateWithoutUserInput>
    create: XOR<NurseDetailCreateWithoutUserInput, NurseDetailUncheckedCreateWithoutUserInput>
  }

  export type NurseDetailUpdateWithWhereUniqueWithoutUserInput = {
    where: NurseDetailWhereUniqueInput
    data: XOR<NurseDetailUpdateWithoutUserInput, NurseDetailUncheckedUpdateWithoutUserInput>
  }

  export type NurseDetailUpdateManyWithWhereWithoutUserInput = {
    where: NurseDetailScalarWhereInput
    data: XOR<NurseDetailUpdateManyMutationInput, NurseDetailUncheckedUpdateManyWithoutUserInput>
  }

  export type NurseDetailScalarWhereInput = {
    AND?: NurseDetailScalarWhereInput | NurseDetailScalarWhereInput[]
    OR?: NurseDetailScalarWhereInput[]
    NOT?: NurseDetailScalarWhereInput | NurseDetailScalarWhereInput[]
    id?: StringFilter<"NurseDetail"> | string
    userId?: StringFilter<"NurseDetail"> | string
    phone?: StringFilter<"NurseDetail"> | string
    address?: StringFilter<"NurseDetail"> | string
    nurseStatus?: EnumNurseStatusFilter<"NurseDetail"> | $Enums.NurseStatus
  }

  export type DailyActivityUpsertWithWhereUniqueWithoutNurseInput = {
    where: DailyActivityWhereUniqueInput
    update: XOR<DailyActivityUpdateWithoutNurseInput, DailyActivityUncheckedUpdateWithoutNurseInput>
    create: XOR<DailyActivityCreateWithoutNurseInput, DailyActivityUncheckedCreateWithoutNurseInput>
  }

  export type DailyActivityUpdateWithWhereUniqueWithoutNurseInput = {
    where: DailyActivityWhereUniqueInput
    data: XOR<DailyActivityUpdateWithoutNurseInput, DailyActivityUncheckedUpdateWithoutNurseInput>
  }

  export type DailyActivityUpdateManyWithWhereWithoutNurseInput = {
    where: DailyActivityScalarWhereInput
    data: XOR<DailyActivityUpdateManyMutationInput, DailyActivityUncheckedUpdateManyWithoutNurseInput>
  }

  export type DailyActivityScalarWhereInput = {
    AND?: DailyActivityScalarWhereInput | DailyActivityScalarWhereInput[]
    OR?: DailyActivityScalarWhereInput[]
    NOT?: DailyActivityScalarWhereInput | DailyActivityScalarWhereInput[]
    id?: StringFilter<"DailyActivity"> | string
    nurseId?: StringFilter<"DailyActivity"> | string
    date?: DateTimeFilter<"DailyActivity"> | Date | string
    shiftType?: StringNullableFilter<"DailyActivity"> | string | null
  }

  export type PatientHandleUpsertWithWhereUniqueWithoutNurseInput = {
    where: PatientHandleWhereUniqueInput
    update: XOR<PatientHandleUpdateWithoutNurseInput, PatientHandleUncheckedUpdateWithoutNurseInput>
    create: XOR<PatientHandleCreateWithoutNurseInput, PatientHandleUncheckedCreateWithoutNurseInput>
  }

  export type PatientHandleUpdateWithWhereUniqueWithoutNurseInput = {
    where: PatientHandleWhereUniqueInput
    data: XOR<PatientHandleUpdateWithoutNurseInput, PatientHandleUncheckedUpdateWithoutNurseInput>
  }

  export type PatientHandleUpdateManyWithWhereWithoutNurseInput = {
    where: PatientHandleScalarWhereInput
    data: XOR<PatientHandleUpdateManyMutationInput, PatientHandleUncheckedUpdateManyWithoutNurseInput>
  }

  export type PatientHandleScalarWhereInput = {
    AND?: PatientHandleScalarWhereInput | PatientHandleScalarWhereInput[]
    OR?: PatientHandleScalarWhereInput[]
    NOT?: PatientHandleScalarWhereInput | PatientHandleScalarWhereInput[]
    id?: StringFilter<"PatientHandle"> | string
    patientId?: StringFilter<"PatientHandle"> | string
    nurseId?: StringFilter<"PatientHandle"> | string
    bradenQ?: IntFilter<"PatientHandle"> | number
    foto?: StringNullableFilter<"PatientHandle"> | string | null
    status?: EnumStatusFilter<"PatientHandle"> | $Enums.Status
    createdAt?: DateTimeFilter<"PatientHandle"> | Date | string
    updatedAt?: DateTimeFilter<"PatientHandle"> | Date | string
  }

  export type UserCreateWithoutNurseDetailInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisiHistory?: ReposisiHistoryCreateNestedManyWithoutNurseInput
    DailyActivity?: DailyActivityCreateNestedManyWithoutNurseInput
    PatientHandle?: PatientHandleCreateNestedManyWithoutNurseInput
  }

  export type UserUncheckedCreateWithoutNurseDetailInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisiHistory?: ReposisiHistoryUncheckedCreateNestedManyWithoutNurseInput
    DailyActivity?: DailyActivityUncheckedCreateNestedManyWithoutNurseInput
    PatientHandle?: PatientHandleUncheckedCreateNestedManyWithoutNurseInput
  }

  export type UserCreateOrConnectWithoutNurseDetailInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNurseDetailInput, UserUncheckedCreateWithoutNurseDetailInput>
  }

  export type UserUpsertWithoutNurseDetailInput = {
    update: XOR<UserUpdateWithoutNurseDetailInput, UserUncheckedUpdateWithoutNurseDetailInput>
    create: XOR<UserCreateWithoutNurseDetailInput, UserUncheckedCreateWithoutNurseDetailInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNurseDetailInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNurseDetailInput, UserUncheckedUpdateWithoutNurseDetailInput>
  }

  export type UserUpdateWithoutNurseDetailInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisiHistory?: ReposisiHistoryUpdateManyWithoutNurseNestedInput
    DailyActivity?: DailyActivityUpdateManyWithoutNurseNestedInput
    PatientHandle?: PatientHandleUpdateManyWithoutNurseNestedInput
  }

  export type UserUncheckedUpdateWithoutNurseDetailInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisiHistory?: ReposisiHistoryUncheckedUpdateManyWithoutNurseNestedInput
    DailyActivity?: DailyActivityUncheckedUpdateManyWithoutNurseNestedInput
    PatientHandle?: PatientHandleUncheckedUpdateManyWithoutNurseNestedInput
  }

  export type UserCreateWithoutDailyActivityInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisiHistory?: ReposisiHistoryCreateNestedManyWithoutNurseInput
    nurseDetail?: NurseDetailCreateNestedManyWithoutUserInput
    PatientHandle?: PatientHandleCreateNestedManyWithoutNurseInput
  }

  export type UserUncheckedCreateWithoutDailyActivityInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisiHistory?: ReposisiHistoryUncheckedCreateNestedManyWithoutNurseInput
    nurseDetail?: NurseDetailUncheckedCreateNestedManyWithoutUserInput
    PatientHandle?: PatientHandleUncheckedCreateNestedManyWithoutNurseInput
  }

  export type UserCreateOrConnectWithoutDailyActivityInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDailyActivityInput, UserUncheckedCreateWithoutDailyActivityInput>
  }

  export type UserUpsertWithoutDailyActivityInput = {
    update: XOR<UserUpdateWithoutDailyActivityInput, UserUncheckedUpdateWithoutDailyActivityInput>
    create: XOR<UserCreateWithoutDailyActivityInput, UserUncheckedCreateWithoutDailyActivityInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDailyActivityInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDailyActivityInput, UserUncheckedUpdateWithoutDailyActivityInput>
  }

  export type UserUpdateWithoutDailyActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisiHistory?: ReposisiHistoryUpdateManyWithoutNurseNestedInput
    nurseDetail?: NurseDetailUpdateManyWithoutUserNestedInput
    PatientHandle?: PatientHandleUpdateManyWithoutNurseNestedInput
  }

  export type UserUncheckedUpdateWithoutDailyActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisiHistory?: ReposisiHistoryUncheckedUpdateManyWithoutNurseNestedInput
    nurseDetail?: NurseDetailUncheckedUpdateManyWithoutUserNestedInput
    PatientHandle?: PatientHandleUncheckedUpdateManyWithoutNurseNestedInput
  }

  export type ReposisiHistoryCreateWithoutPatientInput = {
    id?: string
    position: string
    bradenQ: number
    Time?: Date | string
    foto?: string | null
    nurse: UserCreateNestedOneWithoutReposisiHistoryInput
  }

  export type ReposisiHistoryUncheckedCreateWithoutPatientInput = {
    id?: string
    position: string
    nurseId: string
    bradenQ: number
    Time?: Date | string
    foto?: string | null
  }

  export type ReposisiHistoryCreateOrConnectWithoutPatientInput = {
    where: ReposisiHistoryWhereUniqueInput
    create: XOR<ReposisiHistoryCreateWithoutPatientInput, ReposisiHistoryUncheckedCreateWithoutPatientInput>
  }

  export type ReposisiHistoryCreateManyPatientInputEnvelope = {
    data: ReposisiHistoryCreateManyPatientInput | ReposisiHistoryCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type PatientHandleCreateWithoutPatientInput = {
    id?: string
    bradenQ: number
    foto?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    nurse: UserCreateNestedOneWithoutPatientHandleInput
  }

  export type PatientHandleUncheckedCreateWithoutPatientInput = {
    id?: string
    nurseId: string
    bradenQ: number
    foto?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientHandleCreateOrConnectWithoutPatientInput = {
    where: PatientHandleWhereUniqueInput
    create: XOR<PatientHandleCreateWithoutPatientInput, PatientHandleUncheckedCreateWithoutPatientInput>
  }

  export type PatientHandleCreateManyPatientInputEnvelope = {
    data: PatientHandleCreateManyPatientInput | PatientHandleCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type ReposisiHistoryUpsertWithWhereUniqueWithoutPatientInput = {
    where: ReposisiHistoryWhereUniqueInput
    update: XOR<ReposisiHistoryUpdateWithoutPatientInput, ReposisiHistoryUncheckedUpdateWithoutPatientInput>
    create: XOR<ReposisiHistoryCreateWithoutPatientInput, ReposisiHistoryUncheckedCreateWithoutPatientInput>
  }

  export type ReposisiHistoryUpdateWithWhereUniqueWithoutPatientInput = {
    where: ReposisiHistoryWhereUniqueInput
    data: XOR<ReposisiHistoryUpdateWithoutPatientInput, ReposisiHistoryUncheckedUpdateWithoutPatientInput>
  }

  export type ReposisiHistoryUpdateManyWithWhereWithoutPatientInput = {
    where: ReposisiHistoryScalarWhereInput
    data: XOR<ReposisiHistoryUpdateManyMutationInput, ReposisiHistoryUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientHandleUpsertWithWhereUniqueWithoutPatientInput = {
    where: PatientHandleWhereUniqueInput
    update: XOR<PatientHandleUpdateWithoutPatientInput, PatientHandleUncheckedUpdateWithoutPatientInput>
    create: XOR<PatientHandleCreateWithoutPatientInput, PatientHandleUncheckedCreateWithoutPatientInput>
  }

  export type PatientHandleUpdateWithWhereUniqueWithoutPatientInput = {
    where: PatientHandleWhereUniqueInput
    data: XOR<PatientHandleUpdateWithoutPatientInput, PatientHandleUncheckedUpdateWithoutPatientInput>
  }

  export type PatientHandleUpdateManyWithWhereWithoutPatientInput = {
    where: PatientHandleScalarWhereInput
    data: XOR<PatientHandleUpdateManyMutationInput, PatientHandleUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientCreateWithoutReposisiInput = {
    id?: string
    name: string
    nik: string
    birthDate: Date | string
    bedNumber: number
    gender: $Enums.Gender
    bradenQ: number
    status: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    PatientHandle?: PatientHandleCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutReposisiInput = {
    id?: string
    name: string
    nik: string
    birthDate: Date | string
    bedNumber: number
    gender: $Enums.Gender
    bradenQ: number
    status: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    PatientHandle?: PatientHandleUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutReposisiInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutReposisiInput, PatientUncheckedCreateWithoutReposisiInput>
  }

  export type UserCreateWithoutReposisiHistoryInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    nurseDetail?: NurseDetailCreateNestedManyWithoutUserInput
    DailyActivity?: DailyActivityCreateNestedManyWithoutNurseInput
    PatientHandle?: PatientHandleCreateNestedManyWithoutNurseInput
  }

  export type UserUncheckedCreateWithoutReposisiHistoryInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    nurseDetail?: NurseDetailUncheckedCreateNestedManyWithoutUserInput
    DailyActivity?: DailyActivityUncheckedCreateNestedManyWithoutNurseInput
    PatientHandle?: PatientHandleUncheckedCreateNestedManyWithoutNurseInput
  }

  export type UserCreateOrConnectWithoutReposisiHistoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReposisiHistoryInput, UserUncheckedCreateWithoutReposisiHistoryInput>
  }

  export type PatientUpsertWithoutReposisiInput = {
    update: XOR<PatientUpdateWithoutReposisiInput, PatientUncheckedUpdateWithoutReposisiInput>
    create: XOR<PatientCreateWithoutReposisiInput, PatientUncheckedCreateWithoutReposisiInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutReposisiInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutReposisiInput, PatientUncheckedUpdateWithoutReposisiInput>
  }

  export type PatientUpdateWithoutReposisiInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    bedNumber?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bradenQ?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PatientHandle?: PatientHandleUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutReposisiInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    bedNumber?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bradenQ?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PatientHandle?: PatientHandleUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserUpsertWithoutReposisiHistoryInput = {
    update: XOR<UserUpdateWithoutReposisiHistoryInput, UserUncheckedUpdateWithoutReposisiHistoryInput>
    create: XOR<UserCreateWithoutReposisiHistoryInput, UserUncheckedCreateWithoutReposisiHistoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReposisiHistoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReposisiHistoryInput, UserUncheckedUpdateWithoutReposisiHistoryInput>
  }

  export type UserUpdateWithoutReposisiHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nurseDetail?: NurseDetailUpdateManyWithoutUserNestedInput
    DailyActivity?: DailyActivityUpdateManyWithoutNurseNestedInput
    PatientHandle?: PatientHandleUpdateManyWithoutNurseNestedInput
  }

  export type UserUncheckedUpdateWithoutReposisiHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nurseDetail?: NurseDetailUncheckedUpdateManyWithoutUserNestedInput
    DailyActivity?: DailyActivityUncheckedUpdateManyWithoutNurseNestedInput
    PatientHandle?: PatientHandleUncheckedUpdateManyWithoutNurseNestedInput
  }

  export type PatientCreateWithoutPatientHandleInput = {
    id?: string
    name: string
    nik: string
    birthDate: Date | string
    bedNumber: number
    gender: $Enums.Gender
    bradenQ: number
    status: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisi?: ReposisiHistoryCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutPatientHandleInput = {
    id?: string
    name: string
    nik: string
    birthDate: Date | string
    bedNumber: number
    gender: $Enums.Gender
    bradenQ: number
    status: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisi?: ReposisiHistoryUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutPatientHandleInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutPatientHandleInput, PatientUncheckedCreateWithoutPatientHandleInput>
  }

  export type UserCreateWithoutPatientHandleInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisiHistory?: ReposisiHistoryCreateNestedManyWithoutNurseInput
    nurseDetail?: NurseDetailCreateNestedManyWithoutUserInput
    DailyActivity?: DailyActivityCreateNestedManyWithoutNurseInput
  }

  export type UserUncheckedCreateWithoutPatientHandleInput = {
    id?: string
    role: $Enums.Role
    name: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reposisiHistory?: ReposisiHistoryUncheckedCreateNestedManyWithoutNurseInput
    nurseDetail?: NurseDetailUncheckedCreateNestedManyWithoutUserInput
    DailyActivity?: DailyActivityUncheckedCreateNestedManyWithoutNurseInput
  }

  export type UserCreateOrConnectWithoutPatientHandleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientHandleInput, UserUncheckedCreateWithoutPatientHandleInput>
  }

  export type PatientUpsertWithoutPatientHandleInput = {
    update: XOR<PatientUpdateWithoutPatientHandleInput, PatientUncheckedUpdateWithoutPatientHandleInput>
    create: XOR<PatientCreateWithoutPatientHandleInput, PatientUncheckedCreateWithoutPatientHandleInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutPatientHandleInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutPatientHandleInput, PatientUncheckedUpdateWithoutPatientHandleInput>
  }

  export type PatientUpdateWithoutPatientHandleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    bedNumber?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bradenQ?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisi?: ReposisiHistoryUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutPatientHandleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    bedNumber?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bradenQ?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisi?: ReposisiHistoryUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserUpsertWithoutPatientHandleInput = {
    update: XOR<UserUpdateWithoutPatientHandleInput, UserUncheckedUpdateWithoutPatientHandleInput>
    create: XOR<UserCreateWithoutPatientHandleInput, UserUncheckedCreateWithoutPatientHandleInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientHandleInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientHandleInput, UserUncheckedUpdateWithoutPatientHandleInput>
  }

  export type UserUpdateWithoutPatientHandleInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisiHistory?: ReposisiHistoryUpdateManyWithoutNurseNestedInput
    nurseDetail?: NurseDetailUpdateManyWithoutUserNestedInput
    DailyActivity?: DailyActivityUpdateManyWithoutNurseNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientHandleInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reposisiHistory?: ReposisiHistoryUncheckedUpdateManyWithoutNurseNestedInput
    nurseDetail?: NurseDetailUncheckedUpdateManyWithoutUserNestedInput
    DailyActivity?: DailyActivityUncheckedUpdateManyWithoutNurseNestedInput
  }

  export type ReposisiHistoryCreateManyNurseInput = {
    id?: string
    patientId: string
    position: string
    bradenQ: number
    Time?: Date | string
    foto?: string | null
  }

  export type NurseDetailCreateManyUserInput = {
    id?: string
    phone: string
    address: string
    nurseStatus: $Enums.NurseStatus
  }

  export type DailyActivityCreateManyNurseInput = {
    id?: string
    date?: Date | string
    shiftType?: string | null
  }

  export type PatientHandleCreateManyNurseInput = {
    id?: string
    patientId: string
    bradenQ: number
    foto?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReposisiHistoryUpdateWithoutNurseInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    Time?: DateTimeFieldUpdateOperationsInput | Date | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    patient?: PatientUpdateOneRequiredWithoutReposisiNestedInput
  }

  export type ReposisiHistoryUncheckedUpdateWithoutNurseInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    Time?: DateTimeFieldUpdateOperationsInput | Date | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReposisiHistoryUncheckedUpdateManyWithoutNurseInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    Time?: DateTimeFieldUpdateOperationsInput | Date | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NurseDetailUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    nurseStatus?: EnumNurseStatusFieldUpdateOperationsInput | $Enums.NurseStatus
  }

  export type NurseDetailUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    nurseStatus?: EnumNurseStatusFieldUpdateOperationsInput | $Enums.NurseStatus
  }

  export type NurseDetailUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    nurseStatus?: EnumNurseStatusFieldUpdateOperationsInput | $Enums.NurseStatus
  }

  export type DailyActivityUpdateWithoutNurseInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shiftType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DailyActivityUncheckedUpdateWithoutNurseInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shiftType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DailyActivityUncheckedUpdateManyWithoutNurseInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    shiftType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientHandleUpdateWithoutNurseInput = {
    id?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutPatientHandleNestedInput
  }

  export type PatientHandleUncheckedUpdateWithoutNurseInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientHandleUncheckedUpdateManyWithoutNurseInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReposisiHistoryCreateManyPatientInput = {
    id?: string
    position: string
    nurseId: string
    bradenQ: number
    Time?: Date | string
    foto?: string | null
  }

  export type PatientHandleCreateManyPatientInput = {
    id?: string
    nurseId: string
    bradenQ: number
    foto?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReposisiHistoryUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    Time?: DateTimeFieldUpdateOperationsInput | Date | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    nurse?: UserUpdateOneRequiredWithoutReposisiHistoryNestedInput
  }

  export type ReposisiHistoryUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    nurseId?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    Time?: DateTimeFieldUpdateOperationsInput | Date | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReposisiHistoryUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    nurseId?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    Time?: DateTimeFieldUpdateOperationsInput | Date | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientHandleUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nurse?: UserUpdateOneRequiredWithoutPatientHandleNestedInput
  }

  export type PatientHandleUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    nurseId?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientHandleUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    nurseId?: StringFieldUpdateOperationsInput | string
    bradenQ?: IntFieldUpdateOperationsInput | number
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}