# EOffice App Project

Project các ứng dụng mobile của hệ thống EOffice (App nghiệp vụ, App MobiBeat)

sửa

static BOOL RCTParseUnused(const char **input)
{
return RCTReadString(input, "__attribute__((unused))") ||
RCTReadString(input, "__attribute__((__unused__))") ||

@AshishKapoor AshishKapoor on 10 Sep
Works!

@quangnd1910	Reply…
RCTReadString(input, "__unused");
}

trong node_modules/react-native/React/Base/RCTModuleMethod.mm
